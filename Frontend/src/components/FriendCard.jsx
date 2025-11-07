// import { Link } from "react-router";
// import { LANGUAGE_TO_FLAG } from "../constants";

// const FriendCard = ({ friend }) => {
//   return (
//     <div className="card bg-base-200 hover:shadow-md transition-shadow">
//       <div className="card-body p-4">
//         {/* USER INFO */}
//         <div className="flex items-center gap-3 mb-3">
//           <div className="avatar size-12">
//             <img src={friend.profilePic} alt={friend.fullName} />
//           </div>
//           <h3 className="font-semibold truncate">{friend.fullName}</h3>
//         </div>

//         <div className="flex flex-wrap gap-1.5 mb-3">
//           <span className="badge badge-secondary text-xs">
//             {getLanguageFlag(friend.nativeLanguage)}
//             Native: {friend.nativeLanguage}
//           </span>
//           <span className="badge badge-outline text-xs">
//             {getLanguageFlag(friend.learningLanguage)}
//             Learning: {friend.learningLanguage}
//           </span>
//         </div>

//         <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
//           Message
//         </Link>
//       </div>
//     </div>
//   );
// };
// export default FriendCard;

// export function getLanguageFlag(language) {
//   if (!language) return null;

//   const langLower = language.toLowerCase();
//   const countryCode = LANGUAGE_TO_FLAG[langLower];

//   if (countryCode) {
//     return (
//       <img
//         src={`https://flagcdn.com/24x18/${countryCode}.png`}
//         alt={`${langLower} flag`}
//         className="h-3 mr-1 inline-block"
//       />
//     );
//   }
//   return null;
// }



import { Link } from "react-router";
import { getLanguageFlag } from "../constants";

const FriendCard = ({ friend }) => {
  return (
    <div className="card bg-[#161919] border border-[#1e2222] hover:shadow-[0_0_18px_rgba(0,255,135,0.25)] transition-all duration-300 rounded-xl">
      <div className="card-body p-4 space-y-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3">
          <div className="avatar size-12 rounded-full ring ring-emerald-400 ring-offset-base-100 ring-offset-2">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate text-emerald-200">
            {friend.fullName}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className="badge badge-success badge-outline border-emerald-300 text-xs flex items-center gap-1">
            <img src={getLanguageFlag(friend.nativeLanguage)} className="h-3" />
            Native: {friend.nativeLanguage}
          </span>

          <span className="badge badge-outline border-emerald-700 text-emerald-300 text-xs flex items-center gap-1">
            <img src={getLanguageFlag(friend.learningLanguage)} className="h-3" />
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link
          to={`/chat/${friend._id}`}
          className="btn bg-emerald-500 border-none text-black hover:bg-emerald-400 w-full"
        >
          Message 💬
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
