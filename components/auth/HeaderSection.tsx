import { Image, View } from "react-native"
import { memo } from "react"
import Icon from "../ui/Icon"
import { colors } from "../../constants/Colors"

export const HeaderSection = memo(() =>{
    return(
        <View style={{alignItems:'center',marginTop:30}}>
            <Icon name='open-book' type='Entypo' size={200} color={colors.orange} />
        </View>
    )
})