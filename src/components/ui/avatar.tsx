import * as React from "react"
import { Box, Image, Text, type BoxProps } from "@chakra-ui/react"

interface AvatarProps extends BoxProps {
    src?: string
    name?: string
    size?: "xs" | "sm" | "md" | "lg" | "xl"
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
    const { src, name, size = "md", ...rest } = props

    const sizeMap = {
        xs: "24px",
        sm: "32px",
        md: "40px",
        lg: "48px",
        xl: "64px",
    }

    const boxSize = sizeMap[size]

    return (
        <Box
            ref={ref}
            w={boxSize}
            h={boxSize}
            borderRadius="full"
            overflow="hidden"
            bg="gray.200"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            {...rest}
        >
            {src ? (
                <Image src={src} alt={name} w="full" h="full" objectFit="cover" />
            ) : (
                <Text fontSize="xs" fontWeight="bold" color="gray.600">
                    {(name || "U").charAt(0).toUpperCase()}
                </Text>
            )}
        </Box>
    )
})
