import { SegmentGroup } from "@chakra-ui/react"
import * as React from "react"

interface Item {
    value: string
    label: React.ReactNode
    disabled?: boolean
}

export interface SegmentedControlProps extends SegmentGroup.RootProps {
    items: Item[]
    onValueChange?: (details: { value: string }) => void
}

export const SegmentedControl = React.forwardRef<
    HTMLDivElement,
    SegmentedControlProps
>(function SegmentedControl(props, ref) {
    const { items, onValueChange, ...rest } = props
    const data = React.useMemo(() => items, [items])

    return (
        <SegmentGroup.Root ref={ref} onValueChange={onValueChange} {...rest}>
            <SegmentGroup.Indicator />
            {data.map((item) => (
                <SegmentGroup.Item
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                >
                    <SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
            ))}
        </SegmentGroup.Root>
    )
})
