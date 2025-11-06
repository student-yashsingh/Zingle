// import { useQuery } from "@tanstack/react-query";
// import { getAuthUser } from "../lib/api";

// const useAuthUser = () => {
//   const authUser = useQuery({
//     queryKey: ["authUser"],
//     queryFn: getAuthUser,
//     retry: false, // auth check
//   });

//   return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
// };
// export default useAuthUser;



import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    authUser: data?.user ?? null,
    isLoading,
    error,
  };
};

export default useAuthUser;
