import { Body1, Button, CardHeader, CardPreview, Display, Skeleton, SkeletonItem, Subtitle1, Subtitle2 } from "@fluentui/react-components"

export const SkeletonBlock = () => {
    return (
        <Skeleton>
                <CardHeader
                    header={
                        <Body1>
                            <SkeletonItem shape="circle" size={64}/>
                        </Body1>}
                    description={
                        <SkeletonItem size={8}/>
                    }
                    action={
                        <SkeletonItem shape="circle"/>
                    }
                    style={{ alignSelf: "center" }}
                />
                <CardPreview style={{ paddingInline: "400px", margin: "16px" }}>
                    <SkeletonItem size={8}/>
                </CardPreview>

        </Skeleton>
    )
}