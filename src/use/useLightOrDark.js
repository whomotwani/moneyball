import { Dark } from "quasar";

export function useLightOrDark(lightString, darkString) {
  if (!Dark.isActive) return lightString;
  else return darkString;
}
