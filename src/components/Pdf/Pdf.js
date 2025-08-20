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
      <View>
        <Text style={styles.section}>Työtunnit projektille: {project.name}</Text>
        <Text style={styles.section}>Aikaväliltä : {start} - {end}</Text>
      </View>
      {projectsEntries.map((entry) => {
          return (
            <View key={entry.id}>
              <Text style={styles.section}>{entry.startTime.toDate().toLocaleDateString()}</Text>
              <Text style={styles.section}>{entry.memo}</Text>
            </View>
          )
        }
      )
      }

    </Page>
  </Document>
)

export default Pdf
