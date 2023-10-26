
import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import * as Animatable from 'react-native-animatable';
import Icon from '../components/ui/Icon';
import { colors } from '../constants/Colors';
import { useRouter } from 'expo-router';
import { GlobalStyles } from '../styles';
import TextArea from '../components/ui/TextArea';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setBooks } from '../state/slices/book';

const SplashScreen = () => {
    const {height,width} = Dimensions.get("screen");
    const dispatch = useDispatch();
    const { books } = useSelector((state: RootState) => state.book);
    const [genres,setGenres] = useState<any[]>([
        {name:'Love'},{name:'Religion'},{name:'Fiction'},{name:'Politics'},{name:'Crime'},{name:'Students'},{name:'Other'}
    ])
    const selectedGenre = books?.filter(item => item.selected)?.[0];
    const router = useRouter();
    const uniqueCategories = [...new Set(genres.map(product => product.name))];
    //console.log(selectedGenre)
    useEffect(() => {
        //dispatch(setBooks([]))
    },[])
    return (
        <View style={{flex: 1,padding:20}}>
            <StatusBar style='light' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={{color:'#FFAEA2',fontFamily:'fontBold',fontSize:16}}>ALL BOOKS AVAILABLE</Text>
                    <View>
                        <TextArea attr={{field:'money',icon:{name:'search',type:'FontAwesome',min:5,color:'#5586cc'},keyboardType:'numeric',placeholder:'Search for books...',color:'#009387',handleChange:(field:any,value:any) => {
                            
                        }}} />
                    </View>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                        <View style={{gap:10,flexDirection:'row',paddingVertical:10}}>
                            {books?.map((pharmacy,i:number) => 
                                <TouchableOpacity key={i} style={styles.pharmacyCard} onPress={() => {
                                    const t = books.map(book => book.bookId === pharmacy.bookId ? {...book,selected:true} : {...book,selected:false})
                                    console.log('new changes')
                                    console.log(t)
                                    dispatch(setBooks(t))
                                }}>
                                    <Image style={styles.cardImage} source={{ uri: pharmacy.coverPhoto !== '' ? pharmacy.coverPhoto : 'https://picsum.photos/200/300'}} />
                                    <Text numberOfLines={1} style={styles.cardTitle}>{pharmacy.title}</Text>
                                    <Text numberOfLines={1} style={{fontFamily:'fontLight',alignSelf:'flex-start',color:'green'}}>{`Number Of Pages: ${pharmacy.pages} km`}</Text>
                                    <Text numberOfLines={2} style={{fontFamily:'fontLight',alignSelf:'flex-start'}}>{pharmacy.author}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </ScrollView>
                </View>
                {selectedGenre && 
                    <View>
                        <LinearGradient colors={["#FFAEA2","#f3f9fe","#faf8fa","#f7f3d0"]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 0 }} style={{backgroundColor:'#f9f1ed',elevation:20,justifyContent:'center',padding:5,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{justifyContent:'center'}}>
                                    <Icon name='book-open' type='Feather' size={90} color={colors.primary} />
                                </View>
                                <View style={{flex:1,marginLeft:12,justifyContent:'center'}}>
                                    <Text style={{fontFamily:'fontBold'}}>{selectedGenre?.title.toUpperCase()}</Text>
                                    <Text style={{fontFamily:'fontBold'}}>By {selectedGenre?.author}</Text>
                                    <Text style={{fontFamily:'fontLight'}} numberOfLines={1}>Number Of {selectedGenre?.pages}</Text>
                                </View>
                            </View>
                        </LinearGradient>
                        <View style={{marginTop:24,paddingBottom:24}}>
                            <Image style={{width:'100%',aspectRatio:1}} source={{ uri: selectedGenre?.coverPhoto !== '' ? selectedGenre?.coverPhoto : 'https://picsum.photos/200/300'}}/>
                        </View>
                    </View>
                }
            </ScrollView>
            <View style={{alignItems:'center'}}>
                {books.length === 0 ? <Text style={{fontFamily:'fontBold'}}>No books to read, please add a book</Text> : <Text style={{fontFamily:'fontBold'}}>Add a new book</Text>}
                <View style={{marginTop:12}}><TouchableOpacity onPress={() => router.push('Login')}><Icon type='MaterialIcons' color='green' name='add-circle' size={72}/></TouchableOpacity></View>
            </View>
        </View>
    );
}
export default SplashScreen;
const styles = StyleSheet.create({
    header: {
      backgroundColor: 'blue',
      padding: 15,
    },
    headerText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },
    container: {
      flexDirection: 'row',
    },
    pharmacyList: {
      flex: 1,
    },
    pharmacyCard: {
      padding: 10,
      backgroundColor: '#F5D5BE',
      borderRadius: 10,
      width: 180,
      alignItems: 'center',
    },
    cardImage: {
      width: 165,
      height: 100,
      borderWidth:5,
      borderColor:'#FFAEA2',
      borderRadius: 10,
    },
    cardTitle: {
      fontSize: 16,
      fontFamily:'fontBold',
      color:'white',
      alignSelf:'flex-start'
    },
    productList: {
      flex: 2,
      padding: 10,
    },
    productCard: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: colors.white,
      borderRadius: 10,
      width:'48%',
      elevation:100,
      shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
    },
    productImage: {
      width: '100%',
      height: 120,
      borderRadius: 10,
      borderWidth:2,
      borderColor:'#FFAEA2',
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });