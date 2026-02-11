import { NativeSelect as ChakraNativeSelect } from "@chakra-ui/react"
import * as React from "react"

export interface NativeSelectRootProps extends ChakraNativeSelect.RootProps {
    icon?: React.ReactElement
}

export const NativeSelectRoot = React.forwardRef<
    HTMLDivElement,
    NativeSelectRootProps
>(function NativeSelectRoot(props, ref) {
    const { children, ...rest } = props
    return (
        <ChakraNativeSelect.Root ref={ref} {...rest}>
            {children}
            <ChakraNativeSelect.Indicator />
        </ChakraNativeSelect.Root>
    )
})

export const NativeSelectField = ChakraNativeSelect.Field
