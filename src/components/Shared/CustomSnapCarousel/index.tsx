import { useTheme } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { Subheading, Surface, Text } from "react-native-paper";
// @ts-ignore package doesnt have typescript support as at now
import Pie from "react-native-pie";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { CarouselDataType } from "../../../interfaces/shared_components";
import { DashboardState } from "../../../interfaces/user";
import { dashboardSelector } from "../../../redux/features/dashboard/dashboard_reducer";
import carouselInfo from "../../../seeder/carousel_info";
import carouselItems from "../../../seeder/carousel_items";
import styles from "./styles";

const CustomSnapCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const carouselRef: any = useRef(null);
  const { width } = useWindowDimensions();
  const { dark } = useTheme();
  const { dashboardData } = useSelector(dashboardSelector) as DashboardState;

  console.log("dashboardData", dashboardData);

  const renderItem = (item: CarouselDataType, index: number) => {
    return (
      <Surface key={index} style={styles.carouselItem}>
        <View style={styles.pieView}>
          <Subheading style={styles.subheadingText}>{item.title}</Subheading>
          <View style={styles.gauge}>
            <Pie radius={60} sections={dashboardData} innerRadius={45} strokeCap={"butt"} />
            <Text style={styles.gaugeText}>{item.percent}</Text>
          </View>
        </View>
        <View style={styles.listWrapper}>
          {carouselInfo.map((item2, index2) => {
            return (
              <View key={index2} style={styles.list}>
                <View style={styles.list2}>
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.box,
                        {
                          backgroundColor: item2?.color,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.chartTxt,
                        {
                          color: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.backdrop,
                        },
                      ]}
                    >
                      {item2?.name}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.chartTxt,
                      {
                        color: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.backdrop,
                      },
                    ]}
                  >
                    {item2?.size} ha
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </Surface>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselWrapper}>
        <Carousel
          layout="default"
          ref={carouselRef}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={width}
          renderItem={({ item, index }) => renderItem(item, index)}
          onSnapToItem={(index) => setActiveIndex(index)}
          autoplay={true}
          loop={true}
          autoplayDelay={500}
          autoplayInterval={3000}
        />
      </View>
      <Pagination
        dotsLength={carouselItems?.length}
        activeDotIndex={activeIndex}
        dotColor={dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.primary}
        inactiveDotColor={dark ? combinedDarkTheme.colors.backdrop : combinedDefaultTheme.colors.backdrop}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={carouselRef}
        tappableDots={!!carouselRef}
      />
    </View>
  );
};

export default CustomSnapCarousel;
