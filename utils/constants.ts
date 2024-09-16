export const ACTIVITY_TYPES = {
  SHORT: "Short", MEDIUM: "Medium", LARGE: "Large"
}
export const ACTIVITY_STATUS = {
  TO_DO: "To do", IN_PROGRESS: "In progress", DONE: "Done"
}

export const ACTIVITY_TYPE_OPTIONS = Object.entries(ACTIVITY_TYPES).map(([ key, value ]) => ({ value: value, label: value }))
export const ACTIVITY_STATUS_OPTIONS = Object.entries(ACTIVITY_STATUS).map(([ key, value ]) => ({ value: value, label: value }))


// Tailwind Classes
export const ACTIVE_TAB_CLASSES = "bg-cyan-500 text-white shadow-md shadow-white";
export const INACTIVE_TAB_CLASSES = "bg-white hover:bg-cyan-100 text-black shadow-md";
export const GENERAL_TAB_CLASSES = "p-4 rounded flex items-center justify-center text-lg font-bold";
export const GENERAL_BUTTON_CLASSES = "w-full hover:bg-cyan-500/80 bg-cyan-500 text-white shadow-md shadow-white p-4 rounded flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";
export const MENU_CLASSES = " fixed left-0 right-0 z-40 overflow-hidden transition-all duration-500 ease-in-out shadow-neutral-800 shadow-md"
