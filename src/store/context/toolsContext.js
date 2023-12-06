import { createContext, useState } from "react";
import { useAnimate } from "framer-motion";
const toolsContext = createContext(true)
export default toolsContext


export const ToolsContextProvider = ({ children }) => {
    const [scope, animate] = useAnimate()
    const [localScope, localAnimateFn] = useAnimate()
    const [expanded, setExpanded] = useState(false)

    return <toolsContext.Provider value={{ expanded, expander: setExpanded, scope, animate, localScope, localAnimateFn }}>{children}</toolsContext.Provider>
}