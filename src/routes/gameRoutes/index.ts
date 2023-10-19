import { GAME_NAV } from "@/common/constants";
import GameScreen from "@/screens/gameScreen";
import GameAreaScreen from "@/screens/gameScreen/gameAreaScreen";

export const gameRoutes = [
  {
    name: GAME_NAV.GAME,
    component: GameScreen,
  },
  {
    name: GAME_NAV.GAME_AREA,
    component: GameAreaScreen,
  },
];
