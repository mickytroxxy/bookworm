import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { colors } from "../../constants/Colors";
import { LinearGradient } from 'expo-linear-gradient';
import TextArea from "../ui/TextArea";
import { useRouter } from "expo-router";
import { Button } from "../ui/Button";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalState } from "../../state/slices/modalState";
import Icon from "../ui/Icon";
import { pickImage } from "../../helpers/methods";
export const BodySection = () =>{
    const navigation = useRouter();
    const dispatch = useDispatch();
    const {handleChange,saveBook} = useAuth();
    const [genres,setGenres] = useState<any[]>([
        {name:'Love'},{name:'Religion'},{name:'Fiction'},{name:'Politics'},{name:'Crime'},{name:'Students'},{name:'Other'}
    ])
    const selectedGenre = genres.filter(item => item.selected)?.[0];
    const handleGenreSelect = () => {
        dispatch(setModalState({isVisible:true,attr:{headerText:'SELECT GENRE',field:'service',items:genres.map(item => item.name),handleChange:(field:string,value:any) => {
            setGenres(genres.map(item => item.name === value ? {...item,selected:true} : {...item,selected:false}));
            handleChange('genre',value);
            handleChange('genreDes',value);
            console.log(value)
        }}}))
    }
    const handleCoverPhoto = async () => {
        const res = await pickImage('Not Avatar');
        const image = res?.[0].uri;
        handleChange('coverPhoto',image as string);
    }

    return(
      <View style={{padding:10,flex: 1,marginTop:5,borderRadius:10}}>
        <LinearGradient colors={["#fff","#e8e9f5","#fff","#F6BDA7"]} style={{flex:1,paddingTop:10,borderRadius:10}}>
            <ScrollView style={{padding:10}}> 
                <TextArea attr={{field:'title',icon:{name:'list',type:'Feather',color:'#5586cc',min:6},keyboardType:'default',placeholder:'What is your book`s title?',color:'#009387',handleChange}} />
                <TextArea attr={{field:'author',icon:{name:'list',type:'Feather',color:'#5586cc',min:6},keyboardType:'default',placeholder:'Who is the Author?',color:'#009387',handleChange}} />
                <TouchableOpacity onPress={handleGenreSelect} style={{borderWidth:1,borderRadius:10,padding:15,borderColor:colors.grey, marginTop:15}}>
                    <Text style={{fontFamily:'fontLight'}}>{selectedGenre?.name || 'SELECT GENRE'}</Text>
                </TouchableOpacity>
                {selectedGenre?.name === 'Other' && <TextArea attr={{field:'genreDes',icon:{name:'list',type:'Feather',color:'#5586cc',min:6},keyboardType:'default',placeholder:'Type Your Genre',color:'#009387',handleChange:(value)=>{
                    handleChange('genre',value);
                    handleChange('genreDes',value)
                }}} />}
                <TextArea attr={{field:'pages',icon:{name:'list',type:'Feather',color:'#5586cc',min:6},keyboardType:'numeric',placeholder:'Number of pages',color:'#009387',handleChange}} />
                <TouchableOpacity onPress={handleCoverPhoto} style={{borderWidth:1,borderRadius:10,padding:15,borderColor:colors.grey, marginTop:15,flexDirection:'row'}}>
                    <View>
                        <Icon type="MaterialIcons" name="add-a-photo" size={24} color="green"/>
                    </View>
                    <View style={{justifyContent:'center',paddingLeft:20}}>
                        <Text style={{fontFamily:'fontLight'}}>SELECT COVER PHOTO</Text>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop:15,alignItems:'center'}}>
                    <Button 
                        btnInfo={{styles:{borderRadius:10,borderColor:colors.green,width:'50%'}}} 
                        textInfo={{text:'SAVE BOOK',color:colors.green}} 
                        iconInfo={{type:'MaterialIcons', name:'lock',color:colors.green,size:16}}
                        handleBtnClick={saveBook}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
      </View>
    )
};