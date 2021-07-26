export interface LanguageState {
  language: "zh" | "en";
  languageList: { name: string; code: string }[];
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

const languageReducer = (state = defaultState, action) => {
  if (action.type === "change_language") {
    const newState = { ...state, language: action.payload };
    return newState;
  }
  return state;
};

export default languageReducer;
