import Interpreter, { GlobalObject } from "js-interpreter";
import { AppDispatch } from "../store";
import { blocklySlice } from "../BlocklyInterface/blocklySlice";

export const getIntepreter = (code: string, dispatch: AppDispatch) => {
  function initInterpreter(
    intepreter: Interpreter,
    globalObject: GlobalObject
  ) {
    const highlightBlock = intepreter.createNativeFunction((id: string) => {
      dispatch(blocklySlice.actions.highlightBlock({ blockId: id }));
    });

    const alert = intepreter.createNativeFunction((text: string) => {
      console.log("VM > " + text);
    });

    intepreter.setProperty(globalObject, "alert", alert);
    intepreter.setProperty(globalObject, "highlightBlock", highlightBlock);
  }

  return new Interpreter(code, initInterpreter);
};
