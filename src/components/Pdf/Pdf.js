import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  container: {
    border: '1px solid black',
    width: '95%'
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #ccc'
  },
  text: {
    padding: 8,
    width: '25%',
    fontSize: '0.75rem',
    textAlign: 'center',
    borderLeft: '0.5px solid #ccc'
  }
})

const Pdf = ({project, projectsEntries, start, end, totalHours, totalTravels}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.title}>
        <Text>Työtunnit projektille: {project.name}</Text>
        <Text style={{fontSize: '0.85rem'}}>Aikaväliltä : {start} - {end}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.infoRow}>
          <Text style={styles.text}>Päivä</Text>
          <Text style={styles.text}>Tunnit</Text>
          <Text style={styles.text}>Kilometrit</Text>
          <Text style={styles.text}>Muistiinpanot</Text>
        </View>
        {projectsEntries.map((entry) => {
          return (
            <View key={entry.id} style={styles.section}>
              <Text style={styles.text}>{entry.startTime.toDate().toLocaleDateString()}</Text>
              <Text style={styles.text}>{entry.hours} h</Text>
              <Text style={styles.text}>{entry.kilometers ? entry.kilometers : 0} km</Text>
              <Text style={styles.text}>{entry.memo}</Text>
            </View>
          )
        })}
        <View style={[styles.infoRow, { borderTop: '1px solid #ccc'}]}>
          <Text style={styles.text}>Yht.</Text>
          <Text style={styles.text}>{totalHours} h</Text>
          <Text style={styles.text}>{totalTravels ? totalTravels : 0} km</Text>
          <Text style={styles.text}></Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default Pdf
