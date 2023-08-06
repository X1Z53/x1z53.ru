import { combineReducers } from "redux"
import undoable, { excludeAction } from "redux-undo"
import { GameActionTypes, HistoryActionTypes } from "store/actions"
import { gameReducer } from "store/reducers"

export const rootReducer = combineReducers({
  game: undoable(gameReducer, {
    undoType: GameActionTypes.UndoMove,
    ignoreInitialState: true,
    clearHistoryType: HistoryActionTypes.ClearHistory,
    filter: excludeAction([GameActionTypes.CardIsDragged, GameActionTypes.NewGame])
  }),
})

export type RootState = ReturnType<typeof rootReducer>
