import supabase from "./supabase";

export async function login({ email, password }) {
  console.log("at api auth", email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data?.user;
}
