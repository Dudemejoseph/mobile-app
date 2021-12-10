import { useTheme } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import {
  Avatar,
  Badge,
  Button,
  Headline,
  Paragraph,
  Subheading,
  Text,
} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import Wrapper from "../../components/Shared/Wrapper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { UserState } from "../../interfaces/user";
import { userSelector } from "../../redux/features/user/user_reducer";
import { format } from "date-fns";
import styles from "./styles";
import { setLogoutDialogVisible } from "../../redux/features/dialogs/dialogs_actions";
import { userLogout } from "../../redux/features/user/user_actions";
import LogoutDialog from "../../components/Shared/Dialogs/Logout";
import { DefaultScreenProps } from "../../interfaces/shared_components";
import { EDIT_PROFILE_SCREEN } from "../../constants/route_names";

Feather.loadFont();

const Profile: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const { user } = useSelector(userSelector) as UserState;

  const logoutAction = () => {
    dispatch(userLogout());
  };

  const showLogout = () => {
    dispatch(setLogoutDialogVisible(logoutAction));
  };

  return (
    <Wrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <AppbarComponent
          profileIcon={false}
          backButton={true}
          title="Profile"
          search={false}
        />
        <View style={styles.row}>
          <View style={styles.left}>
            <View style={styles.badgeView}>
              <Avatar.Image
                size={120}
                source={{
                  uri: "https://lh3.googleusercontent.com/ogw/ADea4I4_iCRtDwSjCQXdHrWZkDS7UyjWb82972L-R1SPfQ=s83-c-mo",
                }}
              />
              <Badge
                theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                style={[
                  styles.badge,
                  {
                    backgroundColor: dark
                      ? combinedDarkTheme.colors.text
                      : combinedDefaultTheme.colors.primary,
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.background,
                  },
                ]}
                // @ts-ignore
                children={<Feather name="camera" color={"#FFFFFF"} />}
              />
            </View>
            <Button
              uppercase={false}
              icon="account-edit"
              onPress={() => navigation.push(EDIT_PROFILE_SCREEN)}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              mode="outlined"
              style={{
                borderColor: dark
                  ? combinedDarkTheme.colors.primary
                  : combinedDefaultTheme.colors.primary,
              }}
            >
              Edit Profile
            </Button>
          </View>
          <View>
            <Headline
              style={[
                styles.name,
                {
                  color: dark
                    ? combinedDarkTheme.colors.primary
                    : combinedDefaultTheme.colors.backdrop,
                },
              ]}
            >
              {user?.firstname} {user?.lastname}
            </Headline>
            <View style={styles.infoItems}>
              <Text
                style={[
                  styles.upText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.disabled,
                  },
                ]}
              >
                Postion
              </Text>
              <Text
                style={[
                  styles.bottomText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.backdrop,
                  },
                ]}
              >
                {user?.role}
              </Text>
            </View>
            <View style={styles.infoItems}>
              <Text
                style={[
                  styles.upText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.disabled,
                  },
                ]}
              >
                Date Joined
              </Text>
              <Text
                style={[
                  styles.bottomText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.backdrop,
                  },
                ]}
              >
                {format(new Date(user?.created_at), "MMMM dd, yyyy")}
              </Text>
            </View>
            <View style={styles.infoItems}>
              <Text
                style={[
                  styles.upText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.disabled,
                  },
                ]}
              >
                Email address
              </Text>
              <Text
                style={[
                  styles.bottomText2,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.backdrop,
                  },
                ]}
              >
                {user?.email}
              </Text>
            </View>
            <View style={styles.infoItems}>
              <Text
                style={[
                  styles.upText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.disabled,
                  },
                ]}
              >
                Phone Number
              </Text>
              <Text
                style={[
                  styles.bottomText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.backdrop,
                  },
                ]}
              >
                {user?.phone ?? "N/A"}
              </Text>
            </View>
            <View style={styles.infoItems}>
              <Text
                style={[
                  styles.upText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.disabled,
                  },
                ]}
              >
                Address
              </Text>
              <Text
                style={[
                  styles.bottomText,
                  {
                    color: dark
                      ? combinedDarkTheme.colors.primary
                      : combinedDefaultTheme.colors.backdrop,
                  },
                ]}
              >
                {user?.address ?? "N/A"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.bioView}>
          <Subheading
            style={[
              styles.bioText,
              {
                color: dark
                  ? combinedDarkTheme.colors.primary
                  : combinedDefaultTheme.colors.backdrop,
              },
            ]}
          >
            BIO
          </Subheading>
          <Paragraph
            style={[
              styles.bioInfo,
              {
                color: dark
                  ? combinedDarkTheme.colors.primary
                  : combinedDefaultTheme.colors.disabled,
              },
            ]}
          >
            Lorem ipsum dolor sit amet, consectetur adipi scing elit. Tortor
            turpis sodales nulla velit. Nunc cum vitae, rhoncus leo id. Volutpat
            Duis tinunt pretium luctus pulvinar pretium.
          </Paragraph>
        </View>
        <View style={styles.row2}>
          <Button
            uppercase={false}
            icon="tools"
            mode="contained"
            theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            labelStyle={{
              color: dark
                ? combinedDarkTheme.colors.background
                : combinedDefaultTheme.colors.background,
            }}
          >
            Settings
          </Button>
          <Button
            uppercase={false}
            icon="logout"
            mode="contained"
            theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            labelStyle={{
              color: dark
                ? combinedDarkTheme.colors.error
                : combinedDefaultTheme.colors.background,
            }}
            contentStyle={{
              backgroundColor: dark
                ? combinedDarkTheme.colors.primary
                : combinedDefaultTheme.colors.error,
            }}
            onPress={showLogout}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
      <LogoutDialog />
    </Wrapper>
  );
};

export default Profile;
