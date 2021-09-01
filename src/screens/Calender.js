import React, {useState} from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Image} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import Wrapper from "../components/Wrapper";
import {Agenda} from 'react-native-calendars';
import { COLORS } from "../constants/theme";
import {Card, Avatar} from 'react-native-paper';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Calender = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item, firstItemInDay) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <View style={styles.agendaItemContainer}>
        <View>
          <Text style={styles.agendaTimeRangeText}>11:30 - 12:30</Text>
          <Text style={styles.agendaActivityText}>{item.name}</Text>
          <Text style={styles.durationText}>1 hour</Text>
        </View>
        <View>
          <Image source={require('../assets/icons/ellipsis-v1.png')}/>
        </View>
        </View>

        {firstItemInDay && <View style={styles.agendaItemContainer2}>
        <View>
          <Text style={[styles.agendaActivityText, {color: '#f2994a'}]}>
          Next event in <Text style={{color: '#4D6EFF'}}>30 min</Text>
          </Text>
          <Text style={styles.durationText}>1 hour</Text>
        </View>
        <View>
          <Image source={require('../assets/icons/ellipsis-v1.png')}/>
        </View>
        </View>}
        
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={Date.now()}
        renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay)}
      />
    </View>
  );
};

const styles =StyleSheet.create({
  agendaItemContainer: {
    backgroundColor: '#4d6eff',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agendaItemContainer2: {
    marginTop: 10,
    backgroundColor: '#fdf1db',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  agendaTimeRangeText: {
    color: '#f2f2f2',
    fontSize: 12,
    fontWeight: 'normal',
  },
  agendaActivityText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  durationText: {
    color: '#f2f2f2',
    fontSize: 12,
    fontWeight: 'normal',
  },
});

export default Calender;
