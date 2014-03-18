// Comment to get more information during initialization
logLevel := Level.Warn

resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

resolvers += Resolver.url("local ivy repository", url("file://" + System.getenv("HOME") + "/.ivy2/local/"))(Resolver.ivyStylePatterns)

// Use the Play sbt plugin for Play projects
addSbtPlugin("play" % "sbt-plugin" % "2.1.1")

addSbtPlugin("com.benmccann" % "play-plovr-plugin" % "0.4.4-SNAPSHOT")
