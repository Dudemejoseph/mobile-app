import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, useColorScheme, View } from "react-native";
import { Banner, Headline, Modal, Portal, Subheading, Surface, Text } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
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
import {
  ACTIVITIES_SCREEN,
  ACTIVITIES_STACK,
  CREATE_FARMS_SCREEN,
  EDIT_PROFILE_SCREEN,
  FIELDS_STACK,
  GEO_FENCING_SCREEN,
  INVENTORY_SCREEN,
  INVENTORY_STACK,
  PROFILE_STACK,
  TRACK_EXPENSES_SCREEN,
  TRACK_EXPENSES_STACK,
} from "../../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { CropState } from "../../interfaces/crop";
import { DefaultScreenProps } from "../../interfaces/shared_components";
import { DashboardState, UserState } from "../../interfaces/user";
import { getCrops } from "../../redux/features/crop/crop_actions";
import { cropSelector } from "../../redux/features/crop/crop_reducer";
import { getDashboard } from "../../redux/features/dashboard/dashboard_actions";
import { dashboardSelector } from "../../redux/features/dashboard/dashboard_reducer";
import { userSelector } from "../../redux/features/user/user_reducer";
import styles from "./styles";

MaterialCommunityIcon.loadFont();

const Dashboard: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, message } = useSelector(userSelector) as UserState;
  const { error: dashboardError, fetching: dashboardFetching } = useSelector(dashboardSelector) as DashboardState;
  const { error: cropError, fetching: cropFetching } = useSelector(cropSelector) as CropState;

  const [successSnackbarVisible, setSuccessSnackbarVisible] = useState<boolean>(false);
  const [bannerVisible, setBannerVisible] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
      <AppbarComponent search={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {bannerVisible && (
          /* @ts-ignore */
          <Banner
            style={{
              backgroundColor: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.card,
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
                    color: scheme === "dark" ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
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
                uppercase: false,
                theme: dark ? combinedDarkTheme : combinedDefaultTheme,
              },
            ]}
            icon={() => (
              <MaterialCommunityIcon
                name="information-outline"
                size={20}
                color={dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.primary}
              />
            )}
          >
            You need to complete your profile information
          </Banner>
        )}
        <Headline style={styles.welcomeText}>Welcome Back {user?.firstname}</Headline>
        <View>
          <CustomSnapCarousel />
        </View>
        <Surface style={[styles.middleView]}>
          <View style={styles.directoryRow}>
            <HomeDirectory title="Create Farms" color={blue} onAction={showModal} />

            <HomeDirectory
              title="Activities"
              color={red}
              onAction={() => {
                navigation.navigate(ACTIVITIES_STACK, {
                  screen: ACTIVITIES_SCREEN,
                });
              }}
            />
          </View>
          <View style={styles.directoryRow}>
            <HomeDirectory
              title="Track Expenses"
              color={grey}
              onAction={() =>
                navigation.navigate(TRACK_EXPENSES_STACK, {
                  screen: TRACK_EXPENSES_SCREEN,
                })
              }
            />
            <HomeDirectory
              title="Inventory"
              color={orange}
              onAction={() => {
                navigation.navigate(INVENTORY_STACK, {
                  screen: INVENTORY_SCREEN,
                });
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
                  borderColor: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.primary,
                },
              ]}
            >
              <GenerateReportIcon />
              <Text
                style={[
                  styles.buttonLabel,
                  {
                    color: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.primary,
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
                  borderColor: dark ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                },
              ]}
            >
              <EmergencyIcon />
              <Text
                style={[
                  styles.buttonLabel,
                  {
                    color: dark ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                  },
                ]}
              >
                Emergency
              </Text>
            </TouchableOpacity>
          </View>
        </Surface>
      </ScrollView>
      <Portal theme={dark ? combinedDarkTheme : combinedDefaultTheme}>
        <Modal
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.containerStyle,
            {
              backgroundColor: dark ? combinedDarkTheme.colors.primary : combinedDefaultTheme.colors.card,
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.enter1}
            onPress={() => {
              navigation.navigate(FIELDS_STACK, {
                screen: CREATE_FARMS_SCREEN,
              });
              hideModal();
            }}
          >
            <Subheading
              style={[
                styles.enterTxt,
                {
                  color: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.text,
                },
              ]}
            >
              Create Farm
            </Subheading>
            <Image source={require("../../assets/icons/arrow-right.png")} style={styles.enterIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.enter}
            onPress={() => {
              navigation.navigate(FIELDS_STACK, { screen: GEO_FENCING_SCREEN });
              hideModal();
            }}
          >
            <Subheading
              style={[
                styles.enterTxt,
                {
                  color: dark ? combinedDarkTheme.colors.background : combinedDefaultTheme.colors.text,
                },
              ]}
            >
              Map Farm
            </Subheading>
            <Image source={require("../../assets/icons/arrow-right.png")} style={styles.enterIcon} />
          </TouchableOpacity>
        </Modal>
      </Portal>
      {message && (
        <SuccessSnackbar message={message} visible={successSnackbarVisible} setVisible={setSuccessSnackbarVisible} />
      )}
    </Wrapper>
  );
};

export default Dashboard;
