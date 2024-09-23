// Activities
export const ACTIVITY_TYPES = {
  SHORT: "Short", MEDIUM: "Medium", LARGE: "Large"
}
export const ACTIVITY_STATUS = {
  TO_DO: "To do", IN_PROGRESS: "In progress", DONE: "Done"
}
export const ACTIVITY_TYPE_OPTIONS = Object.entries(ACTIVITY_TYPES).map(([ key, value ]) => ({ value: value, label: value }))
export const ACTIVITY_STATUS_OPTIONS = Object.entries(ACTIVITY_STATUS).map(([ key, value ]) => ({ value: value, label: value }))

// Topics
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

// Balances
export const BALANCE_INPUTS = [
  {
    name: "date",
    type: "date",
    label: "Date",
    required: true
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Write description here...",
  },
]
export const INITIAL_POINT_VALUES = { id: null, text: "" }


// Tailwind Classes
export const ACTIVE_TAB_CLASSES = "bg-cyan-500 text-white shadow-md shadow-white";
export const INACTIVE_TAB_CLASSES = "bg-white hover:bg-cyan-100 text-black shadow-md";
export const GENERAL_TAB_CLASSES = "p-4 rounded flex items-center justify-center text-lg font-bold";
export const GENERAL_BUTTON_CLASSES = "w-full hover:bg-cyan-500/80 bg-cyan-500 text-white shadow-md p-4 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all";
export const CONFIRM_BTN_CLASSES = "bg-emerald-500 hover:bg-emerald-700 uppercase";
export const CANCEL_BTN_CLASSES = "bg-red-500 hover:bg-red-700 uppercase";
export const MENU_CLASSES = " fixed left-0 right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out shadow-neutral-800 shadow-md"
export const EDIT_BTN_CLASSES = "bg-indigo-500 hover:bg-indigo-700 md:min-w-[50px] shadow-slate-400 hover:shadow-none transition-all"
export const DELETE_BTN_CLASSES = "bg-red-800 hover:bg-red-900 md:min-w-[50px] shadow-slate-400 hover:shadow-none transition-all"
export const SOLVE_BTN_CLASSES = "bg-emerald-800 hover:bg-emerald-900 md:min-w-[50px] shadow-slate-400 hover:shadow-none transition-all"
export const REDO_BTN_CLASSES = "bg-green-500 hover:bg-green-700 md:min-w-[50px] shadow-slate-400 hover:shadow-none"
export const DONE_BTN_CLASSES = "bg-green-500 hover:bg-green-700 md:min-w-[50px] shadow-slate-400 hover:shadow-none"
export const BG_TO_DO = "bg-emerald-500/35"
export const BG_IN_PROGRESS = "bg-amber-500/35"
export const BG_DONE = "bg-purple-800/35"
export const NEUTRAL_CARD_CLASSES = "border-cyan-500/40 hover:border-cyan-500 color-cyan rounded hover:cursor-pointer border-2 p-4 flex flex-col gap-16  h-full"
export const POSITIVE_CARD_CLASSES = "border-emerald-500/60 hover:border-emerald-500 text-emerald-500"
export const NEGATIVE_CARD_CLASSES = "border-red-500/40 hover:border-red-500 text-red-500"
export const HEADLINE_CLASSES = {
  h1: "text-4xl uppercase",
  h2: "text-3xl uppercase",
  h3: "text-2xl",
  h4: "text-xl",
  h5: "text-lg",
  h6: "text-md",
}
