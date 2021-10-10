import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Divider, Headline, Menu } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import EmptyList from "../../components/Shared/EmptyListComponent";
import ErrorComponent from "../../components/Shared/ErrorComponent";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import Wrapper from "../../components/Shared/Wrapper";
import { FARM_DETAILS_SCREEN } from "../../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { Farm, FarmState } from "../../interfaces/farm";
import { DefaultScreenProps } from "../../interfaces/shared_components";
import { getFarms } from "../../redux/features/farms/farm_actions";
import { farmSelector } from "../../redux/features/farmSlice";
import styles from "./styles";
Entypo.loadFont();

const numberOfItemsPerPageList = [2, 3, 4];

const Fields: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const { error, fetching, farmData } = useSelector(farmSelector) as FarmState;
  const [pageState, setPageState] = useState<number>(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0]
  );
  const from = pageState * numberOfItemsPerPage;
  const to = Math.min((pageState + 1) * numberOfItemsPerPage, farmData?.length);
  const [visible, setVisible] = useState<number | any>(null);

  const openMenu = (itemId: number) => setVisible(itemId);
  const closeMenu = () => setVisible(null);

  useEffect(() => {
    const fetchFarms = async () => {
      dispatch(getFarms());
    };
    fetchFarms();
  }, [dispatch]);

  useEffect(() => {
    setPageState(0);
  }, [numberOfItemsPerPage]);

  const retry = async () => {
    dispatch(getFarms());
  };

  if (fetching) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorComponent
        error={error}
        loading={fetching}
        action={() => {
          retry();
        }}
      />
    );
  }

  return (
    <Wrapper>
      <ScrollView contentContainerStyle={styles.wrapper}>
        <AppbarComponent />
        <Headline style={styles.welcomeText}>List of Farms</Headline>
        {farmData?.length > 0 && (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Farms</DataTable.Title>
              <DataTable.Title>Location</DataTable.Title>
              <DataTable.Title numeric>Size (Hec)</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>

            {farmData?.map((item: Farm, index: number) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.name}</DataTable.Cell>
                  <DataTable.Cell>{item.location}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.size}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Menu
                      visible={visible === index ? true : false}
                      onDismiss={closeMenu}
                      anchor={
                        <Button
                          onPress={() => openMenu(index)}
                          theme={
                            dark ? combinedDarkTheme : combinedDefaultTheme
                          }
                        >
                          <Entypo name="dots-three-horizontal" size={20} />
                        </Button>
                      }
                      theme={dark ? combinedDarkTheme : combinedDefaultTheme}
                    >
                      <Menu.Item
                        icon="subdirectory-arrow-right"
                        onPress={() => {
                          closeMenu();
                          navigation.push(FARM_DETAILS_SCREEN, { item });
                        }}
                        title="View"
                      />
                      <Menu.Item
                        icon="circle-edit-outline"
                        onPress={() => {}}
                        title="Edit"
                      />
                      <Divider />
                      <Menu.Item
                        icon="delete"
                        onPress={() => {}}
                        title="Delete"
                        titleStyle={{
                          color: dark
                            ? combinedDarkTheme.colors.error
                            : combinedDefaultTheme.colors.error,
                        }}
                      />
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
            <DataTable.Pagination
              page={pageState}
              numberOfPages={Math.ceil(farmData?.length / numberOfItemsPerPage)}
              onPageChange={(number) => setPageState(number)}
              label={`${from + 1}-${to} of ${farmData?.length}`}
              showFastPaginationControls
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              numberOfItemsPerPage={10}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel="Rows per page"
            />
          </DataTable>
        )}
        {farmData?.length < 1 && EmptyList("Farm")}
      </ScrollView>
    </Wrapper>
  );
};

export default Fields;
