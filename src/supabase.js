import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Même API que celle utilisée dans App.jsx : db.doc("games/ID").set / update / onSnapshot
export async function getDb() {
  return {
    doc(path) {
      const id = path.split("/")[1];
      return {
        set: async (data) => {
          const { error } = await supabase.from("games").upsert({ id, data });
          if (error) throw error;
        },
        update: async (patch) => {
          const { data: row, error: e1 } = await supabase
            .from("games").select("data").eq("id", id).single();
          if (e1) throw e1;
          const { error } = await supabase
            .from("games").update({ data: { ...row.data, ...patch } }).eq("id", id);
          if (error) throw error;
        },
        onSnapshot: (cb) => {
          let active = true;
          (async () => {
            const { data: row } = await supabase
              .from("games").select("data").eq("id", id).maybeSingle();
            if (active) cb({ exists: !!row, data: row ? row.data : null });
          })();
          const channel = supabase
            .channel(`game-${id}-${Math.random().toString(36).slice(2)}`)
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table: "games", filter: `id=eq.${id}` },
              (payload) => {
                if (!active) return;
                if (payload.eventType === "DELETE") cb({ exists: false, data: null });
                else cb({ exists: true, data: payload.new.data });
              }
            )
            .subscribe();
          return () => {
            active = false;
            supabase.removeChannel(channel);
          };
        },
      };
    },
  };
}
