import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, DataTable, Divider, Menu } from "react-native-paper";
import Entypo from "react-native-vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import AppbarComponent from "../../components/Shared/Appbar";
import EmptyList from "../../components/Shared/EmptyListComponent";
import ErrorComponent from "../../components/Shared/ErrorComponent";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import Wrapper from "../../components/Shared/Wrapper";
import { ADD_EXPENSE_SCREEN } from "../../constants/route_names";
import { combinedDarkTheme, combinedDefaultTheme } from "../../constants/theme";
import { DefaultScreenProps } from "../../interfaces/shared_components";
import { TransactionsState } from "../../interfaces/transactions";
import { fetchExpenses } from "../../redux/features/transactions/transactions_actions";
import { transactionsSelector } from "../../redux/features/transactions/transactions_reducer";
import styles from "./styles";
Entypo.loadFont();

const optionsPerPage: any = [2, 3, 4];

const TrackExpenses: React.FC<DefaultScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { dark } = useTheme();
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const [visible, setVisible] = useState<number | any>(null);
  const { fetchingFarmExpenses, fetchFarmExpensesError, expensesData } = useSelector(
    transactionsSelector
  ) as TransactionsState;
  const openMenu = (itemId: number) => setVisible(itemId);
  const closeMenu = () => setVisible(null);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const getExpenses = async () => {
      dispatch(fetchExpenses());
    };

    if (!expensesData) {
      getExpenses();
    }
  }, [dispatch, expensesData]);

  const retry = async () => {
    dispatch(fetchExpenses());
  };

  if (fetchingFarmExpenses) {
    return <LoadingComponent />;
  }

  if (fetchFarmExpensesError) {
    return (
      <ErrorComponent
        error={fetchFarmExpensesError}
        loading={fetchingFarmExpenses}
        action={() => {
          retry();
        }}
      />
    );
  }

  return (
    <Wrapper>
      <AppbarComponent title="Track Expenses" backButton={true} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.wrapper}>
        {expensesData?.length > 0 && (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Expense</DataTable.Title>
              <DataTable.Title numeric>Actual (&#8358;)</DataTable.Title>
              <DataTable.Title numeric>Action</DataTable.Title>
            </DataTable.Header>

            {expensesData?.map((item: any, index: number) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.activity_type}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.amount}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    <Menu
                      visible={visible === index ? true : false}
                      onDismiss={closeMenu}
                      anchor={
                        <Button onPress={() => openMenu(index)} theme={dark ? combinedDarkTheme : combinedDefaultTheme}>
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
                      <Menu.Item icon="circle-edit-outline" title="Edit" />
                      <Divider />
                      <Menu.Item
                        icon="delete"
                        title="Delete"
                        titleStyle={{
                          color: dark ? combinedDarkTheme.colors.error : combinedDefaultTheme.colors.error,
                        }}
                      />
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}

            <DataTable.Pagination
              page={page}
              numberOfPages={3}
              onPageChange={(page) => setPage(page)}
              label="1-2 of 6"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </DataTable>
        )}

        <Button
          uppercase={false}
          theme={dark ? combinedDarkTheme : combinedDefaultTheme}
          mode="contained"
          style={styles.eopButton}
          labelStyle={[
            styles.eopText,
            {
              color: dark ? combinedDarkTheme.colors.text : combinedDefaultTheme.colors.background,
            },
          ]}
          onPress={() => navigation.navigate(ADD_EXPENSE_SCREEN)}
        >
          Add Expense
        </Button>
        {expensesData.length < 1 && <EmptyList text="Farm Expenses" />}
      </ScrollView>
    </Wrapper>
  );
};

export default TrackExpenses;
