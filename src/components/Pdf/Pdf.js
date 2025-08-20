import { Page, Text, View, Document, StyleSheet, ReactPDF } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

const Pdf = ({project}) => (
  <Document>
    <Page size="A4">
      <View>
        <Text style={styles.section}>{project.name}</Text>
      </View>
      <View>
        <Text style={styles.section}>Testi</Text>
      </View>
    </Page>
  </Document>
)

export default Pdf
