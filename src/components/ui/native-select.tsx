import { Select as ChakraSelect } from "@chakra-ui/react"
import * as React from "react"

export interface NativeSelectRootProps extends ChakraSelect.RootProps {
    icon?: React.ReactElement
}

export const NativeSelectRoot = React.forwardRef<
    HTMLDivElement,
    NativeSelectRootProps
>(function NativeSelectRoot(props, ref) {
    const { children, ...rest } = props
    return (
        <ChakraSelect.Root ref={ref} {...rest}>
            {children}
            <ChakraSelect.Indicator />
        </ChakraSelect.Root>
    )
})

export const NativeSelectField = ChakraSelect.Field
