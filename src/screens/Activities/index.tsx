import React from "react";
import { ScrollView } from "react-native";
import AppbarComponent from "../../components/Shared/Appbar";
import Wrapper from "../../components/Shared/Wrapper";

const Activities = () => {
  return (
    <Wrapper>
      <ScrollView>
        <AppbarComponent title="Activities" backButton={true} />
      </ScrollView>
    </Wrapper>
  );
};

export default Activities;
