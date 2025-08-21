import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  title: {
    margin: 10,
    padding: 10,
    textAlign: 'center'
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid black'
  },
  text: {
    padding: 5,
  }
})

const Pdf = ({project, projectsEntries, start, end}) => (
  <Document>
    <Page size="A4">
      <View style={styles.title}>
        <Text>Työtunnit projektille: {project.name}</Text>
        <Text>Aikaväliltä : {start} - {end}</Text>
      </View>
      <View>
        <Text>Päivä | Tunnit | Kilometrit | Muistiinpanot</Text>
      </View>
      {projectsEntries.map((entry) => {
          return (
            <View key={entry.id} style={styles.section}>
              <Text style={styles.text}>{entry.startTime.toDate().toLocaleDateString()}</Text>
              <Text style={styles.text}>{entry.hours} h</Text>
              <Text style={styles.text}>{entry.kilometers} km</Text>
              <Text style={styles.text}>{entry.memo}</Text>
            </View>
          )
        }
      )
      }

    </Page>
  </Document>
)

export default Pdf
