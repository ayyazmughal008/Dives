import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import diveSitesDat from '../../assets/data/diveSitesDate';



const testSearch = ({parentCallback}) => {

    const [films, setFilms] = React.useState(diveSitesDat);
    // For Filtered Data
    const [filteredFilms, setFilteredFilms] = React.useState([]);
    // For Selected Data
    const [selectedValue, setSelectedValue] = React.useState({});


    const findFilm = (text) => {
        if (text) {
          const newData = films.filter((item) => {
            const itemDAta = item.Name ? 
            item.Name.toUpperCase()
            : ''.toUpperCase();
            const textData = text.toUpperCase(); 
            return itemDAta.indexOf(textData) > -1
        });
          setFilteredFilms(newData);
      //    setSelectedValue(newData);
      }else {
          setFilteredFilms([]);
        //  setSelectedValue(null)
      }
    };
    

      React.useEffect(() => {
       
    }, [filteredFilms])
    React.useEffect(() => {
        if (selectedValue){
            parentCallback(selectedValue)
        }
    }, [selectedValue])
    return (
            <View style={styles.acContainerStyle}>
        <View style = {styles.container}>

            
            <Autocomplete
              autoCorrect={false}
              listStyle={styles.acListStyle}
              listContainerStyle= {{...styles.acListContainerStyle, 
                // height: (selectedValue !== null) ?  150: null,
            }}
              // Text input container
             // containerStyle={styles.acTextContainerStyle}
             inputContainerStyle={styles.acTextContainerStyle}
             
              style={styles.acTextContainerStyle}
            //   renderTextInput={{
            //       style: (styles.acTextContainerStyle)
            //   }}
              placeholder='Search Location'
              data={filteredFilms}
             defaultValue={selectedValue?.Name}
              onChangeText={text => findFilm(text)}
              flatListProps= {{
                  style: ({ borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor:'#aaa9aa' }),
                    keyExtractor: ((item, index) =>item.OBJECTID.toString()),
                  renderItem: ({item, i}) => (
                    <TouchableOpacity
                    style ={{flexGrow: 1, backgroundColor: '#aaa9a8', borderRadius: 10,}}
                      onPress={() => {
                        setSelectedValue(item);
                        setFilteredFilms([]);
                      }}>
                      <Text style={styles.itemText}>
                          {item.Name}
                      </Text>
                    </TouchableOpacity>
                  )
              }}
            />
        </View>
        
        </View>
    )
}

export default testSearch

const styles = StyleSheet.create({
    container: {
        
       
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
      },
     acContainerStyle: {
         flex: 1,
        top: 35,
        width: Dimensions.get('window').width -35,
        paddingHorizontal: 10,
        position: 'absolute',
        marginHorizontal: 20,
        elevation: 13,
        alignSelf: 'flex-end',
        
      },
      acTextContainerStyle: {
          borderColor: '#fff',
          padding: 3,
          paddingHorizontal: 5,
          borderRadius: 10,
          backgroundColor: '#fff'
          
      },
      acListContainerStyle: {
          
      },
      acListStyle: {
        
      },
      itemText: {
        fontSize: 15,
        padding: 5,
        paddingLeft: 8,
        paddingRight: 30,
       borderRadius: 10,

      }

})
