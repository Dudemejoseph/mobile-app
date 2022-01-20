import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Agenda } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import EmptyList from "../../components/Shared/EmptyListComponent";
import ErrorComponent from "../../components/Shared/ErrorComponent";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import Wrapper from "../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { FarmState } from "../../interfaces/farm";
import { fetchFarmActivitiesAction } from "../../redux/features/farms/farm_actions";
import { farmSelector } from "../../redux/features/farms/farm_reducer";
import { styles } from "./styles";

const timeToString = (time: any) => {
  const date = new Date(time);
  return date.toISOString().split("T")[0];
};

const Calendar = () => {
  const { dark } = useTheme();
  const dispatch = useDispatch();
  const { fetchingFarmActivities, farmActivities, farmActivitiesError } = useSelector(farmSelector) as FarmState;
  const [items, setItems] = useState<{} | any>({});

  // Getting list of famr activities for calendar
  useEffect(() => {
    const getFarmActivities = () => {
      dispatch(fetchFarmActivitiesAction());
    };
    getFarmActivities();
  }, []);

  const retry = async () => {
    dispatch(fetchFarmActivitiesAction());
  };

  const loadActivityItems = () => {
    setTimeout(() => {
      farmActivities.map((item: any) => {
        const strTime = timeToString(item.start_date);
        if (!items[strTime]) {
          items[strTime] = [];
          items[strTime].push({
            name: item.category,
            subCategory: item.subcategory,
            workers_per_hectare: item.workers_per_hectare,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          });
        }
      });
      const newItems = {} as any;
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  if (fetchingFarmActivities) {
    return <LoadingComponent />;
  }

  if (farmActivitiesError) {
    return (
      <ErrorComponent
        error={farmActivitiesError}
        loading={fetchingFarmActivities}
        action={() => {
          retry();
        }}
      />
    );
  }

  const renderItem = (item: any, firstItemInDay: any) => {
    return (
      <TouchableOpacity style={styles.eventItem}>
        <View style={styles.agendaItemContainer}>
          <View>
            <Text style={styles.agendaTimeRangeText}>All day</Text>
            <Text style={styles.agendaActivityText}>Category: {item.name}</Text>
            <Text style={styles.durationText}>Activity: {item.subCategory}</Text>
            <Text style={styles.durationText}>Workers / hectare: {item.workers_per_hectare}</Text>
          </View>
          <View>
            <Image source={require("../../assets/icons/ellipsis-v1.png")} />
          </View>
        </View>

        {firstItemInDay && (
          <View style={styles.agendaItemContainer2}>
            <View>
              <Text style={[styles.agendaActivityText]}>
                Next event in <Text style={styles.nextText}>30 min</Text>
              </Text>
              <Text style={styles.durationText}>1 hour</Text>
            </View>
            <View>
              <Image source={require("../../assets/icons/ellipsis-v1.png")} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Wrapper>
      <AppbarComponent title="Calendar" search={false} backButton={true} />
      <View style={styles.container}>
        {farmActivities?.length > 0 && (
          // @ts-ignore
          <Agenda
            items={items}
            loadItemsForMonth={loadActivityItems}
            selected={Date.now()}
            renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay)}
            renderEmptyDate={() => <EmptyList text="Oops!! No activity for selected date" />}
            theme={{
              backgroundColor: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.background,
              calendarBackground: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.background,
              // textSectionTitleColor: "#b6c1cd",
              // textSectionTitleDisabledColor: "#d9e1e8",
              // selectedDayBackgroundColor: "#00adf5",
              // selectedDayTextColor: "#ffffff",
              // todayTextColor: "#00adf5",
              // dayTextColor: "#2d4150",
              // textDisabledColor: "#d9e1e8",
              // dotColor: "#00adf5",
              // selectedDotColor: "#ffffff",
              // arrowColor: "orange",
              // disabledArrowColor: "#d9e1e8",
              monthTextColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary,
              // indicatorColor: "blue",
              // textDayFontFamily: "monospace",
              // textMonthFontFamily: "monospace",
              // textDayHeaderFontFamily: "monospace",
              // textDayFontWeight: "300",
              // textMonthFontWeight: "bold",
              // textDayHeaderFontWeight: "300",
              // textDayFontSize: 16,
              // textMonthFontSize: 16,
              // textDayHeaderFontSize: 16,
            }}
          />
        )}
        {farmActivities?.length < 1 && <EmptyList text="Activities" />}
      </View>
    </Wrapper>
  );
};

export default Calendar;
