import React from 'react';
import {View, StyleSheet, Text, ImageBackground, Pressable, FlatList, Image, ScrollView, LogBox} from 'react-native';
import { TouchableOpacity as TouchableOpacit} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, colour } from '../../assets/colors/theme';
import {Entypo, MaterialIcons, Feather} from 'react-native-vector-icons';
import SpeciesData from '../../assets/data/ExploreSpecies.js';
import { Overlay } from 'react-native-elements';

LogBox.ignoreLogs([
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
]);
const Explore = ({route, navigation}) => {

    const [value, setValue] = React.useState()
    const [speciesExplore, setSpeciesExplore] = React.useState()
    const [speciesOverlayVisible, setSpeciesOverlayVisible] = React.useState(false)
    const [currentItem, setCurrentItem] = React.useState()
    const [header, setHeader] = React.useState(true)





    const {item} = route.params;

    const renderSpeciesItem = ({item}) => {
        return(
            <View style= {{ 
            flex: 0.333,
            margin: 5, 
            padding: 5, 
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            borderColor: COLORS.white,
            borderWidth: 1.2,
            backgroundColor: '#C1DFFB',
            //backgroundColor: 'rgba(255, 255, 255, 0.2)',
            //backdropStyle: 'blur',
            shadowColor: "#000",
            
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,

            elevation: 0,
            }}>
                <View style = {{justifyContent: 'center', alignItems: 'center', }}>
                    <TouchableOpacity style = {{...styles.circleImage, flexDirection : 'column', backdropStyle: 'blur'}}
                     onPress ={() => {setSpeciesOverlayVisible(true)
                    setCurrentItem(item)
                    //console.log(currentItem)
                    }}>
                        <Image source = {item.image} style = {styles.coverImage}/>
                        <Text style = {{...styles.labelStyles, color: COLORS.darkGray, paddingTop: 10, 
                            fontSize: 13}}>{item.Name}</Text>                        
                    </TouchableOpacity>               
                </View>
                {speciesOverlayVisible && 
                    <View>
                        <Overlay isVisible = {speciesOverlayVisible}
                        onBackdropPress={() => setSpeciesOverlayVisible(false)}
                        backdropStyle={{backgroundColor: 'rgba(0,0,0, 0.08)'}}
                        overlayStyle= {{alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 16,
                        borderColor: COLORS.white,
                        borderWidth: 1.2,
                        //backgroundColor: '#C1DFFB',
                        //opacity: 0.2,
                        
                        
                        backgroundColor: "rgba(193,223,251,0.7)"
                        }}>
                            <View >
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style = {{...styles.labelStyles, color: COLORS.black, paddingTop: 0, 
                                        fontSize: 20}}>{currentItem.Name}</Text>  
                                    <TouchableOpacit  style = {{paddingBottom: 10}}
                                        onPress= {() => setSpeciesOverlayVisible(false)}>
                                        <MaterialIcons name='close' size={26} color={colour.black} />
                                    </TouchableOpacit>                      
                                </View>
                            <Image source = {currentItem.image} style = {styles.overLayImage}/>
                            <View>

                                <Text >{currentItem.description?.WHATTOLOOKFOR}</Text>
                            </View>
                            </View>

                        </Overlay>
                    </View>
                }
            </View>
        )
    };


     {/*Search filter in list */}
     const [search, setsearch] = React.useState('')
     const [masterData, setmasterData] = React.useState()
 
     const searchfilter = (text) => {
         if(text) {
            const newData =  masterData.filter((item) => {
                 const itemDAta = item.Name ? 
                 item.Name.toUpperCase()
                 : ''.toUpperCase();
                 const textData = text.toUpperCase(); 
                 return itemDAta.indexOf(textData) > -1
             });
             setSpeciesExplore(newData);
             setsearch(text);
         }else {
             setSpeciesExplore(masterData);
             setsearch(text)
 
         }
     }

    const renderListHeader = () => {
        
        return(
            <View style = {{marginTop: -10}}>
                <View style = {{flexDirection: 'row', paddingHorizontal: 20,paddingBottom: 20, paddingTop: 10, 
                justifyContent: 'space-between',backgroundColor: COLORS.lightGray2 }}>
                    <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                            <Entypo name='chevron-left' size={32} color={colour.black} />
                        </TouchableOpacity>
                    <Text style = {styles.itemTitle}>{item.title}</Text>
                    <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                            <MaterialIcons name='search' size={32} color={colour.black} />
            </TouchableOpacity>
            </View>
            </View>
        )
    }

    React.useEffect(()=> {
            let currentspecies = SpeciesData.filter(value =>  value.type.toLowerCase() == item.title.toLowerCase() )
            setSpeciesExplore(currentspecies)
            setmasterData(currentspecies)
    }, [])

    React.useEffect(() => {
       // console.log(currentItem)
    }, [currentItem])
    return (
        <View style = {{flex: 1, backgroundColor: COLORS.lightblue4}} >
        <View style = {{
            //flexDirection: 'row', 
            paddingHorizontal: 15, 
            paddingBottom: 15, 
            paddingTop: 8, 
            backgroundColor: '#BED5EB', 
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,

            elevation: 4,}}>
                {header && 
                <View style = {{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 3}}>
                    <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                        <Entypo name='chevron-left' size={30} color={colour.black} />
                    </TouchableOpacity>
                    <Text style = {styles.itemTitle}>{item.title}</Text>
                    <TouchableOpacity style= {styles.backIcon} onPress= {() => setHeader(false)}>
                        <MaterialIcons name='search' size={30} color={colour.black} />
                    </TouchableOpacity>
                </View>
                }
                {!header && 
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style= {styles.backIcon} onPress= {() => navigation.goBack()}>
                        <Entypo name='chevron-left' size={30} color={colour.black} />
                    </TouchableOpacity>
                    <View style = {{flexDirection: 'column', flexGrow: 1}}>
                        <Text style = {{...styles.labelStyles, textAlign: 'left', fontSize: 13, padding: 2, paddingTop: 18, color: COLORS.darkGray}}>
                            Search Species
                        </Text>
                        <TextInput
                            style = {{ padding: 5,  
                            marginHorizontal: 5, fontSize: 16 , backgroundColor: COLORS.darkGray3, borderRadius: 5}}
                            value = {search}
                            placeholder = "    Search Here... "
                            underlineColorAndroid = 'transparent'
                            onChangeText = {(text) => searchfilter(text)}
                            />
                    </View>
                    <TouchableOpacity style= {styles.backIcon} 
                    onPress= {() => {setHeader(true)
                        setSpeciesExplore(masterData);
                        setsearch('')}}>
                        <MaterialIcons name='close' size={30} color={colour.black} />
                    </TouchableOpacity>
                </View>
                }
        </View>
        <ScrollView style={{flex:1}}>
            <View style = {{ flex: 1 , flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center', marginBottom: 100, marginTop: 0, }}>
                <FlatList 
                    data = {speciesExplore}
                    keyExtractor = {(item) => `key-${item.id}`}
                    renderItem = {renderSpeciesItem} 
                    contentContainerStyle={{ flexGrow: 1, padding: 10}}                    
                    numColumns={3}
                    showsVerticalScrollIndicator= {true}
                    scrollEnabled= {true}
                />
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    nwdir: {
        width: 32,
        height:32,
    },
    Ndir: {
        width: 35,
        height:35,
    },
    backIcon: {
        marginTop:38,
        marginLeft: 0,
        alignSelf: 'baseline'
    },
    titlesWrapper: {
        marginHorizontal:20,
        marginBottom: 40,
    },
    itemTitle: {
        fontFamily: 'LatoBold',
        fontSize: 23,
        color: colour.black,
        textTransform: 'capitalize',
        marginTop: 42,        
    },
    labelStyles: {
        fontSize: 18,
        fontFamily: 'LatoRegular',
        padding: 10,
        paddingLeft: 10, 
        textAlign: 'center',        
        //paddingVertical: 25,
        textTransform: 'capitalize',
        
    },
    sublabelStyles :{ 
        fontSize: 14,
        fontFamily: 'LatoRegular',
        color: COLORS.darkGray2,
        //padding: 5,
    },
    // modal: {
    //     margin : 0, 
    //     backgroundColor: COLORS.blue,
    // },
    coverImage: {
        width: 97,
        height: 70,
        resizeMode: 'contain',
        borderRadius: 20,
        alignSelf: 'center',
    },
    overLayImage: {
        width: 320,
        height: 180,
        resizeMode: 'contain',
        borderRadius: 10,
        alignSelf: 'center',
    },
})

export default Explore;
