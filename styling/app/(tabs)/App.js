import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import { Platform, Image, StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const userImage = require('../../assets/images/user.png');

const data = [
  {
    image: userImage,
    name: 'rando1',
    occupation: 'React Native Developer',
    description: 'He loves using JS to build React Native applications for iOS and Android',
    showThumbnail: true
  },
  {
    image: userImage,
    name: 'rando2',
    occupation: 'receptionist',
    description: 'Front desk services',
    showThumbnail: true,
  },
  {
    image: userImage,
    name: 'rando3',
    occupation: 'Front-End Developer',
    description: 'Offers website services',
    showThumbnail: true,
  },
  {
    image: userImage,
    name: 'rando4',
    occupation: 'Back-end Developer',
    description: 'offers backend website services',
    showThumbnail: true,
  },
  {
    image: userImage,
    name: 'rando5',
    occupation: 'UX Designer',
    description: 'Offers UX design packages',
    showThumbnail: true,
  },
  {
    image: userImage,
    name: 'rando6',
    occupation: 'Data Scientist',
    description: 'Offers data science packages',
    showThumbnail: true,
  }
];

const ProfileCard = (props) => {
    const { image, name, occupation, description, onPress, showThumbnail } = props;
    let containerStyles = [styles.cardContainer];
  
    if (showThumbnail) {
      containerStyles.push(styles.cardThumbnail);
    }
  
    return (
      <TouchableHighlight onPress={onPress} style={{ flexBasis: '48%' }}>
        <View style={containerStyles}>
          <View style={styles.cardImageContainer}>
            <Image style={styles.cardImage} source={image} />
          </View>
          <View>
            <Text style={styles.cardName}>
              {name}
            </Text>
          </View>
          <View style={styles.cardOccupationContainer}>
            <Text style={styles.cardOccupation}>
              {occupation}
            </Text>
          </View>
          <View>
            <Text style={styles.cardDescription}>
              {description}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

ProfileCard.propTypes = {
  image: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  showThumbnail: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: data
    };
  }

  handleProfileCardPress = (index) => {
    const showThumbnail = !this.state.data[index].showThumbnail;
    this.setState({
      data: update(this.state.data, { [index]: { showThumbnail: { $set: showThumbnail } } })
    });
  };

  render() {
    const list = this.state.data.map(function (item, index) {
      const { image, name, occupation, description, showThumbnail } = item;
      return <ProfileCard key={'card-' + index}
        image={image}
        name={name}
        occupation={occupation}
        description={description}
        onPress={this.handleProfileCardPress.bind(this, index)}
        showThumbnail={showThumbnail} />;
    }, this);

    return (
      <View style={styles.container}>
        {list}
      </View>
    );
  }
}

const profileCardColor = 'dodgerblue';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    alignContent:'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 10

  },

  cardContainer: {
    display:'flex',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 3,
    borderStyle: 'solid',
    borderRadius: 20,
    backgroundColor: profileCardColor,
    width: 250,
    height: 400,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          height: 5
        },
        shadowOpacity: 1
      },
      android: {
        elevation: 15
      }
    })
  },

  cardImageContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 30,
    paddingTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          height: 10,
        },
        shadowOpacity: 1
      },
      android: {
        borderWidth: 3,
        borderColor: 'black',
        elevation: 15
      }
    })
  },
  cardImage: {
    width: 80,
    height: 80
  },
  cardName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 30,
    textShadowColor: 'black',
    textShadowOffset: {
      height: 5,
      width: 5
    },
    textShadowRadius: 3
  },
  cardOccupationContainer: {
    borderColor: 'black',
    borderBottomWidth: 3
  },
  cardOccupation: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontStyle: 'italic',
    marginTop: 5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10
  },
  cardThumbnail: {
    transform: [{ scale: 0.6 }],
    margin:'1%',
    padding: '2%'

  },
});