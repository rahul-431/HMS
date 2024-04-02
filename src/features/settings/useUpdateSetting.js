import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSettingFn, isLoading: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isUpdating, updateSettingFn };
}
