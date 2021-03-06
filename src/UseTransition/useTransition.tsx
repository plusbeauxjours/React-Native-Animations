import React, { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { mix, transformOrigin, useTimingTransition } from "react-native-redash";

import { Button, Card, cards } from "../components";
import StyleGuide from "../components/StyleGuide";

const { multiply, interpolate } = Animated;
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: StyleGuide.palette.background,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: StyleGuide.spacing * 4,
  },
});

const newOrigin = -(width / 2 - StyleGuide.spacing * 2);

const UseTransition = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const transitionVal = useTimingTransition(toggled, {
    duration: 400,
    easing: Easing.inOut(Easing.ease),
  });

  return (
    <View style={styles.container}>
      {cards.map((card, index) => {
        const rotation = interpolate(index, {
          inputRange: [0, 1, 2],
          outputRange: [-1, 0, 1],
        });
        const rotate = multiply(rotation, mix(transitionVal, 0, Math.PI / 6));
        return (
          <Animated.View
            key={card.id}
            style={[
              styles.overlay,
              {
                transform: transformOrigin({ x: newOrigin, y: 0 }, { rotate }),
              },
            ]}
          >
            <Card {...{ card }} />
          </Animated.View>
        );
      })}
      <Button
        label={toggled ? "Reset" : "Start"}
        primary
        onPress={() => setToggled((prev) => !prev)}
      />
    </View>
  );
};

export default UseTransition;
