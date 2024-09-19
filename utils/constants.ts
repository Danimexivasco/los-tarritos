export const ACTIVITY_TYPES = {
  SHORT: "Short", MEDIUM: "Medium", LARGE: "Large"
}
export const ACTIVITY_STATUS = {
  TO_DO: "To do", IN_PROGRESS: "In progress", DONE: "Done"
}

export const ACTIVITY_TYPE_OPTIONS = Object.entries(ACTIVITY_TYPES).map(([ key, value ]) => ({ value: value, label: value }))
export const ACTIVITY_STATUS_OPTIONS = Object.entries(ACTIVITY_STATUS).map(([ key, value ]) => ({ value: value, label: value }))

export const TOPIC_STATUS = [ "To do", "Done" ] as const
export const TOPIC_INPUTS = [
  {
    name: "status",
    type: "select",
    label: "Status",
    options: TOPIC_STATUS.map(status => ({ value: status, label: status })),
  },
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Title goes here",
    required: true
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Describe here your topic..."
  }
]

// Tailwind Classes
export const ACTIVE_TAB_CLASSES = "bg-cyan-500 text-white shadow-md shadow-white";
export const INACTIVE_TAB_CLASSES = "bg-white hover:bg-cyan-100 text-black shadow-md";
export const GENERAL_TAB_CLASSES = "p-4 rounded flex items-center justify-center text-lg font-bold";
export const GENERAL_BUTTON_CLASSES = "w-full hover:bg-cyan-500/80 bg-cyan-500 text-white shadow-md p-4 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all";
export const MENU_CLASSES = " fixed left-0 right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out shadow-neutral-800 shadow-md"
export const EDIT_BTN_CLASSES = "bg-indigo-500 hover:bg-indigo-700 md:w-[50px] shadow-slate-400 hover:shadow-none transition-all"
export const DELETE_BTN_CLASSES = "bg-red-800 hover:bg-red-900 md:w-[50px] shadow-slate-400 hover:shadow-none transition-all"
export const REDO_BTN_CLASSES = "bg-green-500 hover:bg-green-700 md:w-[50px] shadow-slate-400 hover:shadow-none"
export const DONE_BTN_CLASSES = "bg-green-500 hover:bg-green-700 md:w-[50px] shadow-slate-400 hover:shadow-none"
export const BG_TO_DO = "bg-emerald-500/35"
export const BG_IN_PROGRESS = "bg-amber-500/35"
export const BG_DONE = "bg-purple-800/35"
// TODO: Refactor classes for H1
