import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Banner, Headline, Surface, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import EmergencyIcon from "../../assets/svgs/emergency.svg";
import GenerateReportIcon from "../../assets/svgs/generate_report.svg";
import HomeDirectory from "../../components/HomeDirectory";
import AppbarComponent from "../../components/Shared/Appbar";
import CustomSnapCarousel from "../../components/Shared/CustomSnapCarousel";
import ErrorComponent from "../../components/Shared/ErrorComponent";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import SuccessSnackbar from "../../components/Shared/Snackbar/SuccessSnackbar";
import Wrapper from "../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { CropState } from "../../interfaces/crop";
import { DashboardState, UserState } from "../../interfaces/user";
import { getCrops } from "../../redux/features/crop/crop_actions";
import { cropSelector } from "../../redux/features/crop/crop_reducer";
import { getDashboard } from "../../redux/features/dashboard/dashboard_actions";
import { dashboardSelector } from "../../redux/features/dashboard/dashboard_reducer";
import { userSelector } from "../../redux/features/user/user_reducer";
import styles from "./styles";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { DefaultScreenProps } from "../../interfaces/shared_components";
import {
  EDIT_PROFILE_SCREEN,
  PROFILE_STACK,
} from "../../constants/route_names";

MaterialCommunityIcon.loadFont();

const Dashboard: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, message } = useSelector(userSelector) as UserState;
  const { error: dashboardError, fetching: dashboardFetching } = useSelector(
    dashboardSelector
  ) as DashboardState;
  const { error: cropError, fetching: cropFetching } = useSelector(
    cropSelector
  ) as CropState;

  const [successSnackbarVisible, setSuccessSnackbarVisible] =
    useState<boolean>(false);
  const [bannerVisible, setBannerVisible] = useState<boolean>(false);
  const { dark } = useTheme();
  const scheme = useColorScheme();
  const blue = "rgba(5, 117, 230, 1)";
  const red = "rgba(250, 0, 0, 1)";
  const grey = "rgba(4, 40, 67, 1)";
  const orange = "rgba(255, 151, 75, 1)";

  useEffect(() => {
    const checkProfile = () => {
      if (!user?.phone || !user?.address) {
        setBannerVisible(true);
      } else {
        setBannerVisible(false);
      }
    };
    checkProfile();
  }, [user?.address, user?.phone]);

  useEffect(() => {
    if (message) {
      setSuccessSnackbarVisible(true);
    }
  }, [message]);

  // Fetching dashboard latest data
  useEffect(() => {
    const fetchDashboard = () => {
      dispatch(getDashboard());
    };

    const fetchCrops = () => {
      dispatch(getCrops());
    };

    fetchDashboard();
    fetchCrops();
  }, [dispatch]);

  const retry = async () => {
    dispatch(getDashboard());
    dispatch(getCrops());
  };

  if (dashboardFetching || cropFetching) {
    return <LoadingComponent />;
  }

  if (dashboardError || cropError) {
    return (
      <ErrorComponent
        error={dashboardError ?? cropFetching}
        loading={dashboardFetching ?? cropFetching}
        action={() => {
          retry();
        }}
      />
    );
  }

  return (
    <Wrapper>
      <ScrollView>
        <AppbarComponent />

        {bannerVisible && (
          /* @ts-ignore */
          <Banner
            style={{
              backgroundColor: dark
                ? combinedDarkTheme.colors.background
                : combinedDefaultTheme.colors.card,
            }}
            theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            visible={bannerVisible}
            actions={[
              {
                label: "Ignore",
                onPress: () => setBannerVisible(false),
                uppercase: false,
                theme: dark ? combinedDarkTheme : combinedDefaultTheme,
                labelStyle: [
                  styles.buttonLabelStyle,
                  {
                    color:
                      scheme === "dark"
                        ? combinedDarkTheme.colors.error
                        : combinedDefaultTheme.colors.error,
                  },
                ],
              },
              {
                label: "Complete Profile",
                onPress: () => {
                  navigation.navigate(PROFILE_STACK, {
                    screen: EDIT_PROFILE_SCREEN,
                  });
                  setBannerVisible(false);
                },
                // @ts-ignore
                uppercase: false,
                theme: dark ? combinedDarkTheme : combinedDefaultTheme,
              },
            ]}
            icon={() => (
              <MaterialCommunityIcon
                name="information-outline"
                size={20}
                color={
                  dark
                    ? combinedDarkTheme.colors.text
                    : combinedDefaultTheme.colors.primary
                }
              />
            )}
          >
            You need to complete your profile information
          </Banner>
        )}
        <Headline style={styles.welcomeText}>
          Welcome Back {user?.firstname}
        </Headline>
        <View>
          <CustomSnapCarousel />
        </View>
        <Surface style={[styles.middleView]}>
          <View style={styles.directoryRow}>
            <HomeDirectory
              title="Create Farms"
              color={blue}
              onAction={() => {}}
            />
            <HomeDirectory
              title="Activities"
              color={red}
              onAction={() => {
                console.log("omo we");
              }}
            />
          </View>
          <View style={styles.directoryRow}>
            <HomeDirectory
              title="Track Expenses"
              color={grey}
              onAction={() => {}}
            />
            <HomeDirectory
              title="Inventory"
              color={orange}
              onAction={() => {
                console.log("omo we");
              }}
            />
          </View>
        </Surface>
        <Surface style={[styles.bottomView]}>
          <View style={styles.directoryRow}>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  borderColor: dark
                    ? combinedDarkTheme.colors.text
                    : combinedDefaultTheme.colors.primary,
                },
              ]}
            >
              <GenerateReportIcon />
              <Text
                style={[
                  styles.buttonLabel,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.text
                      : combinedDefaultTheme.colors.primary,
                  },
                ]}
              >
                Generate Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonView,
                {
                  borderColor: dark
                    ? combinedDarkTheme.colors.error
                    : combinedDefaultTheme.colors.error,
                },
              ]}
            >
              <EmergencyIcon />
              <Text
                style={[
                  styles.buttonLabel,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.error
                      : combinedDefaultTheme.colors.error,
                  },
                ]}
              >
                Emergency
              </Text>
            </TouchableOpacity>
          </View>
        </Surface>
      </ScrollView>
      {message &&
        SuccessSnackbar(
          successSnackbarVisible,
          setSuccessSnackbarVisible,
          message
        )}
    </Wrapper>
  );
};

export default Dashboard;
