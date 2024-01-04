const { createClientComponentClient } = require("@supabase/auth-helpers-nextjs");
const supabase = createClientComponentClient();

const { previousMonday, nextMonday } = require("date-fns");

export const getDeliverables = async (projectId, curDate) => {
  curDate = curDate || new Date();
  const prevMon = previousMonday(curDate).toISOString();
  const nextMon = nextMonday(curDate).toISOString();
  let { data, error } = await supabase
    .from("projects")
    .select(
      `
      deliverables(
        date,
        id,
        title,
        description,
        owner,
        complete
      )
    `
    )
    .eq("id", projectId)
    .gte("deliverables.date", prevMon)
    .lt("deliverables.date", nextMon);

  if (error) {
    console.error(error);
  }

  data = data[0]?.deliverables;

  return data;
};
