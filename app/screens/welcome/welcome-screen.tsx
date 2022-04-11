import React, { FC } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Screen,
  Text,
  GradientBackground,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { gql, useQuery } from '@apollo/client';

const GET_COUNTRIES = gql`
  query Countries {
    countries {
      emoji
      code
      name
      native
      phone
      capital
    }
  }
`;

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
  fontSize: 18,
  fontWeight: "bold"
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
}
const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
}
const CONTINUE: ViewStyle = {
  marginBottom: spacing[4],
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  textAlign: "center",
  fontSize: 13,
  letterSpacing: 2,
}

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const { data } = useQuery(GET_COUNTRIES);

    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Countries" />
          </Text>
          {data?.countries.map(country =>
            <View key={country.code}>
              <Text style={HEADER}>{country.name} {country.emoji}</Text>
              <View style={CONTENT}>
                <Text><Text style={BOLD}>Country:</Text> {country.capital}</Text>
                <Text><Text style={BOLD}>Phone code:</Text> +{country.phone}</Text>
                <Text><Text style={BOLD}>Native name:</Text> {country.native}</Text>
              </View>
              <Button style={CONTINUE} onPress={() => navigation.navigate("demo", { code: country.code })}>
                <Text style={CONTINUE_TEXT}>View</Text>
              </Button>
            </View>)}
        </Screen>
      </View>
    )
  },
)
