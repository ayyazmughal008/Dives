import React from 'react';
import {
    View, StyleSheet, Modal, Text, Dimensions, Image, Switch,
    Card, FlatList, TextInput, SafeAreaView, ImageBackground, Pressable, LogBox, EdgeInsetsPropType, Alert, ActivityIndicator
} from 'react-native';
import { TouchableOpacity as TouchableOpacit } from 'react-native';
import FAB from 'react-native-fab'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput as TextInpu } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import CheckBox from 'expo-checkbox';
import { Overlay } from 'react-native-elements';

import Uplaodphoto from '../../components/divelogs/uplaodphoto';
import { COLORS, colour } from '../../assets/colors/theme';
import SpeciesData from '../../assets/data/species';
import * as ImagePicker from 'expo-image-picker';

const Marinelife = ({ parentCallback, MarineLifee }) => {
    const mledit = MarineLifee;

    const [mlVisible, setmlVisible] = React.useState(false)
    const [rareSpeciesToggle, setRareSpeciesToggle] = React.useState(false)
    const [rarespeciesInput, setRareSpeciesInput] = React.useState('')
    const [imagePath, setImagePath] = React.useState("")
    const [openspecies, setopenspecies] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)
    const toggleRareSpecieSwitch = () => setRareSpeciesToggle(previousState => !previousState);
    const [formatData, setformatData] = React.useState([])
    const [userSelected, setUserSelected] = React.useState([])
    const [species, setspecies] = React.useState(SpeciesData)
    const [speciesOverlayVisible, setSpeciesOverlayVisible] = React.useState(false)
    const [speciesOverlayItem, setSpeciesOverlayItem] = React.useState({})


    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
    ]);
    {/*Search filter in list */ }
    const [search, setsearch] = React.useState('')
    const [masterData, setmasterData] = React.useState(SpeciesData)

    const searchfilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemDAta = item.Name ?
                    item.Name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemDAta.indexOf(textData) > -1
            });
            setspecies(newData);
            setsearch(text);
        } else {
            setspecies(masterData);
            setsearch(text)

        }
    }

    function setSelectedUpdate(item) {
        if (item.selected === true) {
            //  var newArray = userSelected.filter((obj) => obj.id === item.id);
            let newArray = userSelected.concat(item)
            //nwarr.concat(item)
            setUserSelected(newArray)
        } else if (item.selected === false) {
            var newArray = userSelected.filter((obj) => obj.id !== item.id);
            setUserSelected(newArray);
        }
    }

    const renderSelectedItems = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row', borderColor: COLORS.lightGray2, borderWidth: 2,
                justifyContent: 'space-between', borderRadius: 6
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View >
                        <Image source={item.image} style={styles.coverImage} />
                    </View>
                    <Text style={{ ...styles.sublabelStyles, color: COLORS.black, padding: 20, }}>{item.Name}</Text>
                </View>
                <TouchableOpacit onPress={() => onChangeValue(item)} style={{
                    backgroundColor: COLORS.lightGray1, borderRadius: 6,
                    borderColor: COLORS.lightGray1, borderWidth: 1.5, marginVertical: 10, marginBottom: 25, marginHorizontal: 3
                }}>
                    <Feather name='minus' size={25} color={COLORS.lightblue2} style={{ paddingHorizontal: 3, alignSelf: 'center', }} />
                </TouchableOpacit>
            </View>
        )
    }


    const onChangeValue = (item) => {
        { item.selected ? item.selected = false : item.selected = true }
        //   setformatData(item)     
        //    console.log(item) 
        setSelectedUpdate(item)
    }
    const handleMLVisibility = () => {
        { mlVisible ? setmlVisible(false) : setmlVisible(true) }
    }

    const openOverlay = (item) => {
        setSpeciesOverlayItem(item)
    }
    const renderSpeciesItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', borderColor: COLORS.lightGray2, borderWidth: 2, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacit style={styles.circleImage} onPress={() => {
                        openOverlay(item)
                        setSpeciesOverlayVisible(true)
                    }}>
                        <Image source={item.image} style={styles.coverImage} />
                    </TouchableOpacit>
                    <Text style={{ ...styles.labelStyles, color: COLORS.darkGray, paddingTop: 20, fontSize: 17 }}>{item.Name}</Text>
                </View>
                <CheckBox
                    checked={item.selected}
                    value={item.selected}
                    onValueChange={() => onChangeValue(item)}
                    style={{ alignSelf: 'center', padding: 10, marginRight: 10 }}
                />

                {/* 
                {speciesOverlayVisible && 
                    <View>
                        <Overlay isVisible={speciesOverlayVisible} 
                            onBackdropPress={() => {setSpeciesOverlayVisible(false)}}
                            overlayStyle = {{borderRadius: 20, padding: 0, margin: 0}}
                            backdropStyle = {{color: "rgbs(0,0,0, 0.3)"}}
                        >
                            <ImageBackground source = {speciesOverlayItem.image} 
                                style={{height: 200, width: 300, resizeMode: 'cover', overflow: 'hidden', borderRadius: 10}}>
                                <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                    <Text style = {{...styles.labelStyles, color: COLORS.white, paddingTop: 3}}>{speciesOverlayItem.Name}</Text>
                                    <TouchableOpacit
                                        onPress ={() => setSpeciesOverlayVisible(false)}>
                                        <Feather name = 'x' size = {22} color={COLORS.white2}/>
                                    </TouchableOpacit>
                                </View>
                            </ImageBackground>
                        </Overlay>
                    </View>
                } */}
            </View>
        )
    };
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });
        console.log('..>', JSON.stringify(_image));
        let data = {
            name: Date.now() + '_Dives',
            type: 'image/jpeg',
            uri: _image.uri
        }
        if (!_image.cancelled) {
            _handleSubmit(data)
        }
    }
    const _handleSubmit = (file) => {
        setLoading(true)
        const body = new FormData();
        body.append('image', file);
        fetch(`http://157.245.56.243/dives/public/api/get-path`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: body
        })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoading(false)
                if (json.status == 200) {
                    setImagePath(json.data);
                } else {
                    Alert.alert('', json.message)
                }

            })
            .catch(error => {
                setLoading(false)
                console.log("response error ===>", error)
            })
    }

    React.useEffect(() => {
        if (rareSpeciesToggle == false) {
            setRareSpeciesInput('')
        }
    }, [rareSpeciesToggle])

    React.useEffect(() => {
        if (mledit && Object.keys(mledit).length !== 0) {
            //console.log('......>', mledit)
            if (mledit.MarineLife && Object.keys(mledit.MarineLife).length !== 0) {

                setmlVisible(true)
                let newarr = mledit.MarineLife
                newarr.forEach((item, index) => {
                    if (item.selected === true) {
                        let arr = species;
                        var i = arr.findIndex(o => o.id === item.id);
                        if (arr[i]) { arr[i] = item } else { arr.push(item) };
                        setspecies(arr)
                    }
                });

                setUserSelected(mledit.MarineLife)
            }
            if (mledit.RareSpecies.RareSpecies) {
                setRareSpeciesToggle(mledit.RareSpecies.RareSpecies)
                if (mledit.RareSpecies.RareSpeciesTypes) {
                    setRareSpeciesInput(mledit.RareSpecies.RareSpeciesTypes)
                }
                if (mledit.RareSpecies.RareSpeciesTypesImage) {
                    setImagePath(mledit.RareSpecies.RareSpeciesTypesImage)
                }
            }

        }
    }, [mledit])

    React.useEffect(() => {
        //   console.log(userSelected)
        parentCallback({
            MarineLife: userSelected,
            RareSpecies: {
                RareSpecies: rareSpeciesToggle,
                RareSpeciesTypes: rarespeciesInput,
                RareSpeciesTypesImage: imagePath
            }
        })
    }, [userSelected, rareSpeciesToggle, rarespeciesInput, imagePath])

    React.useEffect(() => {
        if (mledit === undefined) {
            const result = species.map(({ selected, ...rest }) => ({ ...rest }));
            // console.log(result)
            setspecies(result)
        }

    }, [])

    React.useEffect(() => {
        //console.log(species)
    }, [species])




    return (
        <View>
            {/*Marine Life*/}
            <View style={{
                borderColor: COLORS.lightGray1, borderWidth: 1.5, borderRadius: 8,
                borderBottomColor: COLORS.lightGray1, borderBottomWidth: 1.5, padding: 5
            }}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }}
                    onPress={() => handleMLVisibility()}>
                    <Text style={styles.diveLogSubHeaders}>Marine Life</Text>
                    {mlVisible ?
                        <Feather name='minus-circle' size={17} color={COLORS.black} style={{ alignSelf: 'center', paddingLeft: 10, }} />
                        : <Feather name='plus-circle' size={17} color={COLORS.black} style={{ alignSelf: 'center', paddingLeft: 10, }} />
                    }
                </TouchableOpacity>
                {mlVisible &&
                    <View>
                        <View>
                            <TouchableOpacity onPress={() => setopenspecies(true)} style={{
                                backgroundColor: COLORS.lightblue1, borderRadius: 10,
                                flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, marginHorizontal: 3
                            }}>
                                <Text style={{
                                    ...styles.labelStyles, fontWeight: 'bold', paddingVertical: 10, paddingLeft: 20,
                                    color: COLORS.white
                                }}>Add Marine Life</Text>
                                <Feather name='plus' size={20} color={COLORS.white} style={{ padding: 10 }} />
                            </TouchableOpacity>
                            <Modal
                                style={{ marginBottom: 20, paddingBottom: 20, backgroundColor: COLORS.white }}
                                animationType="slide"
                                transparent={false}
                                visible={openspecies}
                                onRequestClose={() => {
                                    setopenspecies(false);
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, paddingBottom: 10, marginTop: 10, marginHorizontal: 5 }}>
                                    <Text style={{ textAlign: 'left', ...styles.diveLogHeaders, fontSize: 20 }}>Select Marine Life</Text>
                                    <TouchableOpacit style={{ alignSelf: 'flex-end', padding: 2, paddingBottom: 0 }}
                                        onPress={() => setopenspecies(false)}>
                                        <Feather name='x' size={25} color={COLORS.darkGray2} />
                                    </TouchableOpacit>
                                </View>
                                <View>
                                    <TextInpu
                                        style={{
                                            ...styles.input, padding: 10, margin: 20,
                                            marginHorizontal: 20, fontSize: 16
                                        }}
                                        value={search}
                                        placeholder="    Search Here... "
                                        underlineColorAndroid='transparent'
                                        onChangeText={(text) => searchfilter(text)}
                                    />
                                </View>
                                <View style={{ marginBottom: 20, paddingBottom: 80, }}>

                                    <View>
                                        <FlatList
                                            data={species.sort((a, b) => a.Name.localeCompare(b.Name))}
                                            keyExtractor={(item) => `key-${item.id}`}
                                            renderItem={renderSpeciesItem}
                                            contentContainerStyle={{ paddingBottom: 20 }}
                                        />
                                    </View>
                                    <View style={{ paddingVertical: 10, }}>

                                    </View>
                                </View>
                                <View style={{
                                    position: 'absolute',
                                    bottom: 5,
                                    right: 2
                                }}>
                                    <FAB

                                        buttonColor={COLORS.lightblue2}
                                        onClickAction={() => setopenspecies(false)
                                        }
                                        visible={true}
                                        iconTextComponent={<Feather name="check" color={COLORS.white} size={24} />} />
                                </View>
                            </Modal>
                        </View>
                        <SafeAreaView>

                            <View>
                                <FlatList
                                    data={userSelected}
                                    scrollEnabled={false}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item) => `key-${item.id}`}
                                    renderItem={renderSelectedItems} />
                            </View>
                        </SafeAreaView>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.diveLogSubHeaders}>Rare Species</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: COLORS.lightblue4 }}
                                thumbColor={rareSpeciesToggle ? COLORS.blue : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleRareSpecieSwitch}
                                value={rareSpeciesToggle}
                            />
                        </View>

                        {rareSpeciesToggle &&
                            <View style={{ borderBottomColor: COLORS.lightGray1, borderBottomWidth: 1, paddingHorizontal: 5 }}>

                                <View>
                                    <TextInput
                                        style={{ backgroundColor: COLORS.lightGray2, padding: 10 }}
                                        placeholder='Enter Species...'
                                        label='Species Name'
                                        value={rarespeciesInput}
                                        underlineColor={COLORS.blue}
                                        multiline
                                        theme={{ colors: { primary: COLORS.blue } }}
                                        onChangeText={text => setRareSpeciesInput(text)}
                                    />
                                </View>
                                <View >
                                    <Uplaodphoto
                                        image={imagePath}
                                        addImage={() => addImage()}
                                    />
                                </View>
                            </View>
                        }
                    </View>

                }
            </View>
            {isLoading &&
                <ActivityIndicator
                    size='large'
                    color='#000'
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: COLORS.lightGray2,
        backgroundColor: COLORS.lightGray2,
        paddingLeft: 20,
        borderRadius: 6,
        marginVertical: 0,
        marginLeft: 10
    },
    inputStyle: {
        color: COLORS.black,
        fontFamily: 'LatoRegular',
        fontSize: 14,
    },
    diveLogHeaders: {
        fontFamily: 'LatoBold',
        fontSize: 17,
        color: COLORS.black,
    },
    diveLogSubHeaders: {
        marginHorizontal: 5,
        marginVertical: 10,
        marginTop: 10,
        fontFamily: 'LatoBold',
        fontSize: 16,
        color: COLORS.black,
    },
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor: COLORS.lightGray2,
        borderColor: COLORS.lightGray1,
        borderWidth: 3,
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderRadius: 10,
        margin: 2,
    },
    buttonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: COLORS.blue,
        alignSelf: 'center',

    },
    tankbuttonslected: {
        //marginHorizontal:20, 
        marginTop: 20,
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        // paddingHorizontal: 5,
        width: 105,
    },
    tankbuttonNotslected: {
        //marginHorizontal:20, 
        marginTop: 20,
        backgroundColor: COLORS.darkGray,
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 10,
        // paddingHorizontal: 5,
        width: 105,
    },
    overlayButtonTExt: {
        fontFamily: 'LatoBold',
        fontSize: 18,
        color: colour.white,
    },
    overlaysubtext: {
        fontFamily: "LatoRegular",
        fontSize: 13,
        textAlign: 'center'
    },
    mftgray: {
        color: COLORS.darkGray2,
    },
    mftblack: {
        color: COLORS.black,
        fontWeight: 'bold'
    },
    slidertext: {
        marginHorizontal: 5,
        marginVertical: 10,
        marginTop: 10,
        fontFamily: 'LatoBold',
        fontSize: 16,
        color: COLORS.black,
        //textAlign: 'center',
    },
    labelStyles: {
        fontSize: 18,
        fontFamily: 'LatoRegular',
        padding: 5,
        paddingLeft: 10,
        paddingVertical: 25,
        textTransform: 'capitalize',
    },
    sublabelStyles: {
        fontSize: 14,
        fontFamily: 'LatoRegular',
        color: COLORS.darkGray2,
        paddingHorizontal: 5,
    },
    // modal: {
    //     margin : 0, 
    //     backgroundColor: COLORS.blue,
    // },
    coverImage: {
        //margin: 10,
        marginTop: 3,
        marginHorizontal: 10,
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 50,
    },
    conditionButton: {
        width: 100,
        height: 75,
        backgroundColor: COLORS.lightOrange2,
        borderRadius: 20,
        borderColor: COLORS.lightOrange2,
        borderWidth: 2,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    presSelected: {
        color: COLORS.blue,
        fontSize: 16,
        alignSelf: 'flex-end',
        fontFamily: 'LatoBold',
        paddingHorizontal: 5,
    },
    presnotSelected: {
        alignSelf: 'flex-end',
        fontSize: 14,
        fontFamily: 'LatoRegular',
        color: COLORS.darkGray2,
        paddingHorizontal: 5,
    },
})

export default Marinelife;
