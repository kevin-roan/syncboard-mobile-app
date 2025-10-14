import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Let Paper handle the background
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },

  // List container
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  projectCard: {
    marginVertical: 4,
  },

  // Empty state
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 12,
  },

  emptyStateContent: {
    alignItems: 'center',
    maxWidth: 280,
  },

  emptyIcon: {
    marginBottom: 24,
    opacity: 0.6,
  },

  emptyTitle: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
  },

  emptySubtitle: {
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.8,
  },

  // Floating Action Button
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});

export default styles;
