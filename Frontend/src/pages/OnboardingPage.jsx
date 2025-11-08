import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, MapPinIcon, Video, ShuffleIcon, CameraIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile saved 🎉");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Your random avatar is ready now");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-8">
      <div className="card bg-base-200 w-full max-w-3xl shadow-2xl rounded-2xl border border-primary/20">
        <div className="card-body p-8 space-y-6">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Almost done yaar 👀</h1>
            <p className="opacity-70 mt-1">
              Just thoda sa personal touch — so Zingle feels like <span className="font-semibold">your</span> space ✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden shadow-md">
                {formState.profilePic ? (
                  <img src={formState.profilePic} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              <button type="button" onClick={handleRandomAvatar} className="btn btn-accent">
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Your Full Name</span>
              </label>
              <input
                type="text"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="e.g. Yash Singh"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Bio</span>
              </label>
              <textarea
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Say something cool about yourself…"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Aapki Mother Tongue?</span>
                </label>
                <select
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select one</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Which language you're learning?</span>
                </label>
                <select
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select one</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60 size-5" />
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="Mumbai, India"
                />
              </div>
            </div>

            <button className="btn btn-primary w-full btn-lg mt-4" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <Video className="size-5 mr-2" />
                  Done — Start Zingle!
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Updating…
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
