import { Flex, Spinner } from "@once-ui-system/core";

export default function Loading() {
    return (
        <Flex fillWidth paddingY="xl" horizontal="center">
            <Spinner />
        </Flex>
    );
}
