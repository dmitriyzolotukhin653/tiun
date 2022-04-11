import React, { FC } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Header,
  Text,
  Screen,
  GradientBackground,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing, typography } from "../../theme"
import { gql, useQuery } from "@apollo/client"

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
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
const CONTENT: TextStyle = {
  ...TEXT,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
  marginBottom: spacing[5],
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

const GET_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      native
      phone
      capital
      emoji
      emojiU
      languages {
        name
      }
    }
  }`

export const DemoScreen: FC<StackScreenProps<NavigatorParamList, "demo">> = observer(
  ({ navigation, route }) => {
    const goBack = () => navigation.goBack()
    console.log(route.params)
    const { data } = useQuery(GET_COUNTRY, { variables: { code: route.params?.code } });
    console.log('data', data)

    return (
      <View testID="DemoScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
          <Header
            leftIcon="back"
            onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          />
          <Text style={TITLE_WRAPPER}>
            <Text style={TITLE} text="Country Info" />
          </Text>
          {data && <>
            <Text style={HEADER}>{data.country.name} {data.country.emoji}</Text>
            <View style={CONTENT}>
              <Text><Text style={BOLD}>Country:</Text> {data.country.capital}</Text>
              <Text><Text style={BOLD}>Phone code:</Text> +{data.country.phone}</Text>
              <Text><Text style={BOLD}>Native name:</Text> {data.country.native}</Text>
              <Text><Text style={BOLD}>Languages:</Text> {data.country.languages.map(lang => lang.name).join(', ')}</Text>
            </View>
          </>}
        </Screen>
      </View>
    )
  },
)
