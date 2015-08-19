export default {
  suppressAutoExposureLogging(experimentClass) {
    if (experimentClass.setAutoExposureLogging && typeof(experimentClass.setAutoExposureLogging) == "function") {
      experimentClass.setAutoExposureLogging(false);
    }
    return experimentClass;
  }
}
