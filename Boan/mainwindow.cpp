#include "mainwindow.h"
#include "ui_mainwindow.h"

#include "dialog_about.h"
#include "spider.h"

#include <QFileSystemModel>
#include <QTreeView>
#include <QStandardItemModel>
#include <QDebug>

MainWindow::MainWindow(QWidget *parent):
    QMainWindow(parent),
    ui(new Ui::MainWindow) {
    ui->setupUi(this);

    spider spiderman;
    //QFileSystemModel *model = new QFileSystemModel;
    //model->setRootPath(QDir::currentPath());
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::on_actionAbout_triggered() {
    Dialog_about mDialog;
    mDialog.setModal(true);
    mDialog.exec();
}

void MainWindow::on_scanButton_clicked()
{
    qDebug() << "Scan button clicked";;
    QString site_to_crawl = ui->plainTextEdit->toPlainText();
    qDebug() << site_to_crawl;

    spider spiderman;

    QStandardItemModel *model = new QStandardItemModel;
    QStandardItem *parentItem = model->invisibleRootItem();

    spiderman.crawl(parentItem, site_to_crawl);



    ui->treeView->setModel(model);
    ui->treeView->show();
}
