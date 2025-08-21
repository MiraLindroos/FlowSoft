import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
})

const Pdf = ({project, projectsEntries, start, end}) => (
  <Document>
    <Page size="A4">
      <View style={styles.section}>
        <Text>Työtunnit projektille: {project.name}</Text>
        <Text>Aikaväliltä : {start} - {end}</Text>
      </View>
      <View style={styles.section}>
        <Text>Päivä | Tunnit | Kilometrit | Muistiinpanot</Text>
      </View>
      {projectsEntries.map((entry) => {
          return (
            <View key={entry.id} style={styles.section}>
              <Text>{entry.startTime.toDate().toLocaleDateString()}</Text>
              <Text>{entry.hours}</Text>
              <Text>{entry.kilometers}</Text>
              <Text>{entry.memo}</Text>
            </View>
          )
        }
      )
      }

    </Page>
  </Document>
)

export default Pdf
