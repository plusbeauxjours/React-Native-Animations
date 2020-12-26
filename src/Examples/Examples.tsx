import * as React from "react";
import { StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { StyleGuide, Thumbnail } from "../components";
import { Lessons } from "../components/Routes";
import styled from "styled-components/native";

export const examples = [
  {
    screen: "ClockValuesAndIdentities",
    title: "Clock Values & Identities",
    source: require("../../assets/examples/clock-values-and-identities.png"),
  },
] as const;

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
});

const ScrollView = styled.ScrollView`
  background-color: ${StyleGuide.palette.background};
`;
const Examples = () => {
  const { navigate } = useNavigation<
    StackNavigationProp<Lessons, "Examples">
  >();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail) => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};

export default Examples;
