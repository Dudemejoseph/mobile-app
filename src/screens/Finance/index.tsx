import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Divider, Menu } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import ErrorComponent from "../../components/Shared/ErrorComponent";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import Wrapper from "../../components/Shared/Wrapper";
import { ADD_FINANCE_SCREEN, FINANCE_STACK } from "../../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { DefaultScreenProps } from "../../interfaces/shared_components";
import { Transaction, TransactionsState } from "../../interfaces/transactions";
import { UserState } from "../../interfaces/user";
import { fetchFinancesAction } from "../../redux/features/transactions/transactions_actions";
import { transactionsSelector } from "../../redux/features/transactions/transactions_reducer";
import { userSelector } from "../../redux/features/user/user_reducer";
import styles from "./styles";
Entypo.loadFont();

const numberOfItemsPerPageList = [2, 3, 4];

const Finance: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const { user } = useSelector(userSelector) as UserState;
  const { fetching, financesData, error } = useSelector(
    transactionsSelector
  ) as TransactionsState;
  const [pageState, setPageState] = useState<number>(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState<number>(
    numberOfItemsPerPageList[0]
  );
  const from = pageState * numberOfItemsPerPage;
  const to = Math.min(
    (pageState + 1) * numberOfItemsPerPage,
    financesData?.length
  );
  const [visible, setVisible] = useState<number | any>(null);

  const openMenu = (itemId: number) => setVisible(itemId);
  const closeMenu = () => setVisible(null);

  useEffect(() => {
    setPageState(0);
  }, [numberOfItemsPerPage]);

  useEffect(() => {
    const getFinances = async () => {
      dispatch(fetchFinancesAction());
    };
    getFinances();
  }, [dispatch]);

  const retry = async () => {
    dispatch(fetchFinancesAction());
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
        <AppbarComponent
          title="Finance Overview"
          backButton={true}
          search={false}
        />
        {user?.role.includes("admin") && (
          <Button
            uppercase={false}
            theme={dark ? combinedDarkTheme : combinedDefaultTheme}
            mode="outlined"
            style={styles.eopButton}
            labelStyle={styles.eopText}
          >
            View EOP
          </Button>
        )}
        {financesData?.length > 0 && (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Activity</DataTable.Title>
              <DataTable.Title numeric>Amount (&#8358;)</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>

            {financesData?.map((item: Transaction, index: number) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.activity}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
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
                          // navigation.push(FARM_DETAILS_SCREEN, { item });
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
              numberOfPages={Math.ceil(
                financesData?.length / numberOfItemsPerPage
              )}
              onPageChange={(number) => setPageState(number)}
              label={`${from + 1}-${to} of ${financesData?.length}`}
              showFastPaginationControls
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              theme={dark ? combinedDarkTheme : combinedDefaultTheme}
              numberOfItemsPerPage={10}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel="Rows per page"
            />
          </DataTable>
        )}

        <Button
          uppercase={false}
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          mode="contained"
          style={styles.eopButton}
          labelStyle={styles.eopText}
          onPress={() =>
            navigation.push(FINANCE_STACK, { screen: ADD_FINANCE_SCREEN })
          }
        >
          Add Cost
        </Button>
      </ScrollView>
    </Wrapper>
  );
};

export default Finance;
