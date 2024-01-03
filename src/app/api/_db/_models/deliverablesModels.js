// const db = require("../index.js");
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { previousMonday, nextMonday } from "date-fns";


const supabase = createClientComponentClient();

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
